import { NextResponse } from "next/server";
import { appointmentSchema, sanitize } from "@/lib/validation";
import { deliverAppointment } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * In-memory rate limiter. Good enough for a single-instance clinic site.
 * For multi-instance deployments, back this with Redis/Upstash.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map does not grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  const ip = getIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: silently succeed for bots without doing anything.
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Sanitise free-text fields before delivery.
  const clean = {
    ...data,
    fullName: sanitize(data.fullName),
    treatment: sanitize(data.treatment),
    message: data.message ? sanitize(data.message) : "",
  };

  try {
    const result = await deliverAppointment(clean);
    return NextResponse.json(
      { ok: true, delivered: result.delivered },
      { status: 200 },
    );
  } catch (err) {
    // Never leak internal details to the client.
    // eslint-disable-next-line no-console
    console.error("[appointments] Unexpected error:", (err as Error).message);
    return NextResponse.json(
      { error: "We could not submit your request right now. Please call or WhatsApp the clinic." },
      { status: 500 },
    );
  }
}

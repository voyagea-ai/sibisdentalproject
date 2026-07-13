# Dr. Sibi's Dental Care and Implant Center — Website

A production-ready, cinematic website for a premium dental clinic in Palani, Tamil Nadu. The homepage is an interactive, scroll-controlled experience: the visitor walks down a corridor, frosted-glass doors open, the camera enters a premium treatment room and orbits the dental chair as the examination light and monitor come to life — then flows into the clinic's story and a fast booking flow.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis · Framer Motion · React Three Fiber · React Hook Form + Zod**.

---

## Highlights

- **Canvas image-sequence hero** — a 4K Higgsfield video reduced to device-tiered WebP frame sequences (desktop 160 / tablet 110 / mobile 60), drawn into a single `<canvas>` and scrubbed by scroll. Progressive frame loading, `ResizeObserver`, DPR-aware cover drawing, and a reduced-motion static fallback.
- **Scroll-scrubbed implant assembly** — an educational, non-graphic titanium implant animation with staged labels.
- **Fast booking everywhere** — a global, focus-trapped booking modal (opens instantly, Escape to close, preserves typed data) plus a dedicated `/book-appointment` page and inline forms. Secure API route with Zod validation, sanitisation, rate limiting and a honeypot.
- **Always-available actions** — Book / Call / WhatsApp / Directions reachable from the header, mobile menu, persistent mobile bottom bar, and every section.
- **Accessibility-first** — `prefers-reduced-motion` swaps all cinematic sequences for calm static imagery, full keyboard support, focus trapping, skip link, semantic headings, and no essential information locked inside video.
- **SEO** — per-page metadata, canonical URLs, Open Graph/Twitter, sitemap, robots, and JSON-LD (Dentist / MedicalBusiness / LocalBusiness / Person / FAQPage / BreadcrumbList) using **verified information only**.

---

## Project structure

```
app/
  page.tsx                 # Homepage (cinematic hero + all sections)
  about/ doctor/ treatments/ treatments/[slug]/
  dental-implants/ patient-information/ gallery/ contact/ book-appointment/
  privacy-policy/ terms/ medical-disclaimer/ accessibility/
  api/appointments/route.ts  # Secure appointment endpoint
  sitemap.ts  robots.ts  not-found.tsx  layout.tsx  globals.css
components/
  layout/     # Header, MobileMenu, MobileActionBar, Footer, SmoothScroll,
              # ScrollProgress, DentalCursor, PageTransition, LoadingScreen, Providers
  hero/       # HeroCanvasSequence, ReducedMotionFallback
  treatments/ # TreatmentJourney, ScrollTooth (R3F), ImplantExperience,
              # TechnologyPanel, PatientJourney, TreatmentCard, TreatmentDirectory
  appointments/ # AppointmentForm, AppointmentModal, AppointmentProvider, ContactButtons
  gallery/    # Gallery, BeforeAfterSlider (+ TreatmentStories), TestimonialSlider
  home/       # HomeHero, WhyChoose, BookingSection
  ui/         # Button, Reveal, SectionHeading, PageHeader, CTASection, FAQAccordion,
              # Prose, MedicalDisclaimer, PortraitPlaceholder
  seo/        # JsonLd
  DoctorIntroduction.tsx  LocationSection.tsx
content/
  clinic.ts      # Single source of truth for clinic info (verified + TO_BE_CONFIRMED)
  treatments.ts  # Treatment directory (every item verifiedByClinic: false)
  faqs.ts        # General / implant / visit FAQs
lib/
  validation.ts  whatsapp.ts  email.ts  seo.ts  analytics.ts
  gsap.ts  frame-loader.ts  hero-sequence.ts  device.ts  useReducedMotion.ts
public/
  images/        # Optimized WebP (room, corridor, implant, posters, OG)
  videos/        # hero.mp4/.webm + implant-assembly.mp4/.webm fallbacks
  sequences/     # hero-desktop / hero-tablet / hero-mobile / implant  (WebP frames)
scripts/         # Video/image masters + build helpers (git-ignored, not deployed)
```

---

## Getting started

Requirements: **Node.js 18.18+** (Node 20 recommended).

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:4390
```

Scripts:

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on port 4390 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (port 4390) |
| `npm run lint` | Next.js lint |
| `npm run typecheck` | `tsc --noEmit` |

### Environment variables

Copy `.env.example` to `.env.local`. All email credentials are read **server-side only** and never exposed to the browser.

| Variable | Purpose |
|---|---|
| `APPOINTMENT_RECEIVER_EMAIL` | Clinic inbox that receives appointment requests |
| `APPOINTMENT_SENDER_EMAIL` | Verified "from" address on your email provider |
| `EMAIL_PROVIDER_API_KEY` | Transactional email API key (example integration: Resend) |
| `DATABASE_URL` | Optional — if you choose to persist requests |
| `NEXT_PUBLIC_SITE_URL` | Public origin (canonical URLs, sitemap, OG) |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL` | Official Google Maps place URL for the clinic |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile URL |

If `EMAIL_PROVIDER_API_KEY` / `APPOINTMENT_RECEIVER_EMAIL` are not set, submissions are validated and **logged server-side** so nothing is lost during development. Swap the provider in `lib/email.ts` for SendGrid, Postmark, SES, etc.

---

## The cinematic hero pipeline

The hero is **not** a raw 4K video shipped to every visitor. The flow is:

1. **Master frame** — one approved Higgsfield image of the treatment room (`scripts/master-room.png`).
2. **Videos** — generated with the master as the visual reference so the room stays identical: a corridor → doors-open → enter clip, and a room-orbit clip. They chain seamlessly (the approach ends on the master frame; the orbit begins on it).
3. **Concatenate** into one master (`scripts/hero-master.mp4`, ~18s).
4. **Extract frames** per device tier and encode to WebP:

```bash
# from the project root (requires ffmpeg + cwebp)
ffmpeg -i scripts/hero-master.mp4 -vf "fps=9,scale=1600:900:flags=lanczos"  -frames:v 160 -q:v 2 scripts/tmp/f-%04d.jpg
for f in scripts/tmp/f-*.jpg; do cwebp -q 74 "$f" -o "public/sequences/hero-desktop/frame-XXXX.webp"; done
# repeat at 1200×675 (110 frames) → hero-tablet, and 900×506 (60 frames) → hero-mobile
```

5. **Fallbacks** — a 720p `hero.mp4` + `hero.webm`, a poster, a reduced-motion still, and an OG image.

Frame counts and dimensions live in `lib/hero-sequence.ts`; if you re-export with different counts, update that manifest. The same approach powers the implant assembly sequence (`public/sequences/implant`).

> All generated room visuals are design assets only. They are **never** presented as real photographs of the clinic (see the gallery labelling).

---

## Deployment

Recommended: **Vercel** (zero-config for Next.js App Router).

1. Push the repository to GitHub/GitLab.
2. Import into Vercel; framework preset **Next.js** is auto-detected.
3. Add the environment variables from `.env.example` in the Vercel dashboard.
4. Deploy. The appointment API route runs on the Node.js runtime.

Any Node host works too:

```bash
npm run build
npm run start   # serves on port 4390 (override with -p)
```

Notes:
- Frame sequences and videos are served with long-lived immutable cache headers (`next.config.mjs`).
- The in-memory rate limiter in the API route is per-instance. For multi-instance/serverless scale, back it with Redis/Upstash.

---

## Before launch

See **[CONTENT-CHECKLIST.md](./CONTENT-CHECKLIST.md)** for every piece of information that must be confirmed by the clinic before publishing. Nothing unverified is invented anywhere in this project — placeholders are clearly marked and treatment content carries `verifiedByClinic: false`.

---

Website designed and developed by **PTRI Innovation**.

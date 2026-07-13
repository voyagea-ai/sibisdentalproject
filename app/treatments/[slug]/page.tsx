import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { treatments, getTreatment, getRelatedTreatments } from "@/content/treatments";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { MedicalDisclaimer } from "@/components/ui/MedicalDisclaimer";
import { CTASection } from "@/components/ui/CTASection";
import { BookButton } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/appointments/ContactButtons";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return pageMetadata({
    title: `${t.title} in Palani`,
    description: t.shortDescription,
    path: `/treatments/${t.slug}`,
  });
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();
  const related = getRelatedTreatments(slug);

  return (
    <>
      <PageHeader
        eyebrow={t.category}
        titleLines={[t.title]}
        subtitle={t.shortDescription}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Treatments", href: "/treatments" },
          { name: t.title, href: `/treatments/${t.slug}` },
        ]}
      />

      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Overview</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t.overview}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal">Who may benefit</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t.whoMayBenefit}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal">Potential benefits</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal">Consultation process</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t.consultation}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal">General treatment journey</h2>
              <ol className="mt-4 space-y-3 border-l border-hair-dark">
                {t.journey.map((step, i) => (
                  <li key={step} className="relative pl-6 text-sm text-muted">
                    <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-champagne bg-bg-light" aria-hidden />
                    <span className="text-champagne">{String(i + 1).padStart(2, "0")}</span> — {step}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-charcoal">Frequently asked questions</h2>
              <div className="mt-4">
                <FAQAccordion faqs={t.faq} />
              </div>
            </div>

            <MedicalDisclaimer />
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-3xl border border-hair-dark bg-white/60 p-7">
              <p className="eyebrow mb-3">Book</p>
              <h3 className="font-serif text-xl text-charcoal">
                Discuss {t.title.toLowerCase()} with the clinic
              </h3>
              <p className="mt-2 text-sm text-muted">
                Every plan is personalised. Request an appointment or ask a question.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <BookButton variant="gold" source={`treatment-page-${t.slug}`} treatment={t.title} className="w-full">
                  Book Appointment
                </BookButton>
                <WhatsAppButton
                  source={`treatment-page-${t.slug}`}
                  label="Discuss this treatment"
                  className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-hair-dark text-sm text-charcoal transition hover:border-champagne"
                />
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-xs uppercase tracking-eyebrow text-champagne">
                  Related treatments
                </h3>
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/treatments/${r.slug}`}
                        className="flex items-center justify-between rounded-2xl border border-hair-dark bg-white/50 px-4 py-3 text-sm text-charcoal transition hover:border-champagne"
                      >
                        {r.title}
                        <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CTASection source={`treatment-${t.slug}`} treatment={t.title} />
      <JsonLd data={faqJsonLd(t.faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Treatments", path: "/treatments" },
          { name: t.title, path: `/treatments/${t.slug}` },
        ])}
      />
    </>
  );
}

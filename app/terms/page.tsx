import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { pageMetadata } from "@/lib/seo";
import { clinic } from "@/content/clinic";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and conditions for using the Dr. Sibi's Dental Care and Implant Center website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        titleLines={["Terms and", "Conditions"]}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Terms and Conditions", href: "/terms" },
        ]}
      />
      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x">
          <Prose>
            <p>
              These terms govern your use of the {clinic.name} website. By using the
              website, you agree to these terms.
            </p>

            <h2>Website content</h2>
            <p>
              Content on this website is provided for general information and is
              educational in nature. It does not constitute dental or medical advice
              and does not replace a professional consultation.
            </p>

            <h2>Appointment requests</h2>
            <p>
              Submitting the appointment form sends a <strong>request</strong>. It is
              not a confirmed appointment. The clinic will contact you to confirm a
              date and time, subject to availability.
            </p>

            <h2>No guarantees</h2>
            <p>
              Treatment information describes general approaches only. Suitability,
              stages and outcomes vary between patients and can only be determined
              through examination. No specific result is guaranteed.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The design, text and visual assets on this website may not be copied or
              reused without permission.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms from time to time. The latest version will
              always be available on this page.
            </p>

            <h2>Contact</h2>
            <p>For any question about these terms, contact the clinic at {clinic.phone.display}.</p>
          </Prose>
        </div>
      </section>
    </>
  );
}

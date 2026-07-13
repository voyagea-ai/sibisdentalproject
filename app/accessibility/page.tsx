import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { pageMetadata } from "@/lib/seo";
import { clinic } from "@/content/clinic";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility",
  description:
    "Our commitment to an accessible website at Dr. Sibi's Dental Care and Implant Center, including reduced-motion support and keyboard navigation.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessibility"
        titleLines={["Accessibility"]}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Accessibility", href: "/accessibility" },
        ]}
      />
      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x">
          <Prose>
            <p>
              We want everyone to be able to use this website comfortably and to book
              an appointment easily. We have built the site with accessibility in
              mind.
            </p>

            <h2>What we have implemented</h2>
            <ul>
              <li>Respect for the <strong>reduced-motion</strong> preference — cinematic sequences are replaced with calm static imagery and simple fades.</li>
              <li>Full keyboard navigation with visible focus states.</li>
              <li>Semantic HTML and a correct heading hierarchy.</li>
              <li>Descriptive labels and alternative text for meaningful images.</li>
              <li>Sufficient colour contrast for text.</li>
              <li>Accessible form errors and screen-reader announcements.</li>
              <li>Focus trapping within the booking modal, which closes with Escape.</li>
              <li>A skip-to-content link and large touch targets.</li>
            </ul>

            <h2>Essential information is never hidden in animation</h2>
            <p>
              All essential information and every appointment action remain available
              without relying on video or animation.
            </p>

            <h2>Feedback</h2>
            <p>
              If you experience any difficulty using this website, please contact the
              clinic at {clinic.phone.display} so we can help and continue to improve.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}

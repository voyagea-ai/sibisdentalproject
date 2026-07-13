import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { pageMetadata } from "@/lib/seo";
import { clinic } from "@/content/clinic";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Dr. Sibi's Dental Care and Implant Center collects, uses and protects information submitted through the website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        titleLines={["Privacy Policy"]}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />
      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x">
          <Prose>
            <p>
              This Privacy Policy explains how {clinic.name} (&ldquo;the clinic&rdquo;,
              &ldquo;we&rdquo;) handles information you provide through this website.
              A verified privacy contact will be published before launch.
            </p>

            <h2>Information we collect</h2>
            <p>
              When you submit the appointment request form, we collect the
              information you provide: your name, phone number, preferred date and
              time, the treatment or concern you select, whether you are a new or
              existing patient, and optionally your email and a short message. We do
              not collect detailed medical history through this website.
            </p>

            <h2>Purpose of collection</h2>
            <p>
              We use this information solely to respond to your appointment request
              and to contact you to confirm a date and time.
            </p>

            <h2>How the clinic may contact you</h2>
            <p>
              With your consent, the clinic may contact you by phone, WhatsApp or
              email using the details you provide, in connection with your request.
            </p>

            <h2>Data protection &amp; retention</h2>
            <p>
              Information is handled with reasonable care and retained only as long
              as needed to manage your request and appointment, unless a longer
              period is required by law. The clinic&rsquo;s specific retention period
              will be confirmed.
            </p>

            <h2>Requesting correction or deletion</h2>
            <p>
              You may request access to, correction of, or deletion of the
              information you have submitted by contacting the clinic at{" "}
              {clinic.phone.display}.
            </p>

            <h2>Third-party services</h2>
            <p>
              The website may use third-party services such as maps and, if
              configured, an email delivery provider to send your request to the
              clinic. These providers process data according to their own policies.
            </p>

            <h2>Analytics &amp; cookies</h2>
            <p>
              If analytics are enabled, we use privacy-conscious event tracking to
              understand how the website is used (for example, that a booking button
              was clicked). We do not collect sensitive medical information through
              analytics. Any cookies used are limited to what is necessary for the
              website to function and, where applicable, optional analytics you can
              decline.
            </p>

            <h2>Contact</h2>
            <p>
              For any privacy question, contact the clinic at {clinic.phone.display}.
              A named privacy contact will be confirmed before launch.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { pageMetadata } from "@/lib/seo";
import { clinic } from "@/content/clinic";

export const metadata: Metadata = pageMetadata({
  title: "Medical Disclaimer",
  description:
    "Medical disclaimer for the Dr. Sibi's Dental Care and Implant Center website. Information is educational and does not replace a professional consultation.",
  path: "/medical-disclaimer",
});

export default function MedicalDisclaimerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        titleLines={["Medical", "Disclaimer"]}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Medical Disclaimer", href: "/medical-disclaimer" },
        ]}
      />
      <section data-nav-theme="light" className="bg-bg-light py-20 sm:py-24">
        <div className="container-x">
          <Prose>
            <h2>Educational information only</h2>
            <p>
              The information provided on this website is for general, educational
              purposes. It is intended to help you understand dental treatments in
              broad terms.
            </p>

            <h2>Not a substitute for consultation</h2>
            <p>
              This information does not replace a professional dental consultation,
              diagnosis or treatment. Always seek the advice of a qualified dentist or
              healthcare professional regarding your individual situation.
            </p>

            <h2>Treatment suitability requires examination</h2>
            <p>
              Whether any treatment is appropriate for you can only be determined
              through an in-person examination. Descriptions of treatment stages are
              general and are not an exact representation of every patient&rsquo;s
              treatment.
            </p>

            <h2>Results differ between patients</h2>
            <p>
              Outcomes vary from person to person. No specific result is promised or
              guaranteed.
            </p>

            <h2>Appointment requests</h2>
            <p>
              An appointment request submitted through this website requires
              confirmation by the clinic and is not a confirmed appointment.
            </p>

            <h2>Emergencies</h2>
            <p>
              In a dental or medical emergency, contact appropriate local emergency
              services, or contact the clinic according to its verified emergency
              policy. Do not rely on this website for emergency guidance. You can
              reach the clinic at {clinic.phone.display}.
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}

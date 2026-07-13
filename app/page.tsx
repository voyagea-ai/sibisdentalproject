import { HomeHero } from "@/components/home/HomeHero";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { DoctorIntroduction } from "@/components/DoctorIntroduction";
import { TreatmentJourney } from "@/components/treatments/TreatmentJourney";
import { ImplantExperience } from "@/components/treatments/ImplantExperience";
import { TechnologyPanel } from "@/components/treatments/TechnologyPanel";
import { PatientJourney } from "@/components/treatments/PatientJourney";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Gallery } from "@/components/gallery/Gallery";
import { TreatmentStories } from "@/components/gallery/BeforeAfterSlider";
import { TestimonialSlider } from "@/components/gallery/TestimonialSlider";
import { BookingSection } from "@/components/home/BookingSection";
import { LocationSection } from "@/components/LocationSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { generalFaqs } from "@/content/faqs";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <HomeHero />
      <DoctorIntroduction />
      <TreatmentJourney />
      <ImplantExperience />
      <TechnologyPanel />
      <PatientJourney />
      <WhyChoose />
      <Gallery />
      <TreatmentStories />
      <TestimonialSlider />
      <BookingSection />
      <LocationSection />
      <JsonLd data={faqJsonLd(generalFaqs)} />
    </>
  );
}

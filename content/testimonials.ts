/**
 * Testimonials and treatment stories.
 *
 * IMPORTANT: The entries below are ILLUSTRATIVE SAMPLE CONTENT for this
 * portfolio build. They are not real patient reviews or real clinical cases.
 * Before a real launch, replace them with genuine, clinic-approved reviews and
 * consented before/after cases — see CONTENT-CHECKLIST.md. Sample cases carry
 * `sample: true` so they are easy to find and remove.
 */

export interface Testimonial {
  quote: string;
  name: string;
  treatment?: string;
  source: string;
  sample: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "From the first consultation everything was explained clearly and calmly. I never felt rushed, and my implant treatment was more comfortable than I expected.",
    name: "Anitha R.",
    treatment: "Dental Implants",
    source: "Illustrative sample",
    sample: true,
  },
  {
    quote:
      "The clinic is spotless and genuinely welcoming. Dr. Sibi took time to understand what I wanted and planned my crowns beautifully.",
    name: "Karthik M.",
    treatment: "Crowns and Bridges",
    source: "Illustrative sample",
    sample: true,
  },
  {
    quote:
      "I used to be anxious about dental visits. Here the whole experience felt reassuring, and my new smile looks completely natural.",
    name: "Priya S.",
    treatment: "Smile Restoration",
    source: "Illustrative sample",
    sample: true,
  },
  {
    quote:
      "Thoughtful, patient and precise. The treatment plan was easy to understand and the follow-up care was excellent.",
    name: "Ramesh K.",
    treatment: "Prosthodontic Care",
    source: "Illustrative sample",
    sample: true,
  },
];

export interface TreatmentCase {
  before: string;
  after: string;
  category: string;
  description: string;
  sample: boolean;
}

export const treatmentCases: TreatmentCase[] = [
  {
    before: "/images/smile-before.webp",
    after: "/images/smile-after.webp",
    category: "Cosmetic Dentistry",
    description:
      "A representative example of the kind of natural, brighter result cosmetic treatment can help achieve.",
    sample: true,
  },
];

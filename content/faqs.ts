/**
 * General FAQs used across the site and for FAQPage structured data.
 * Answers are calm, non-diagnostic and avoid guarantees.
 */

export interface FAQ {
  question: string;
  answer: string;
}

export const generalFaqs: FAQ[] = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can request an appointment using the booking form on this website, by calling the clinic, or through WhatsApp. Requests are confirmed by the clinic, which will contact you to arrange a date and time.",
  },
  {
    question: "Where is the clinic located?",
    answer:
      "Dr. Sibi's Dental Care and Implant Center is at 18, Thiruvalluvar Street, Opposite Tamil Ilakkiya Mandram, Shanmugappuram, Palani, Tamil Nadu 624601.",
  },
  {
    question: "Is submitting the form a confirmed appointment?",
    answer:
      "No. Submitting the form sends an appointment request. The clinic will contact you to confirm your preferred date and time.",
  },
  {
    question: "What should I bring to my first visit?",
    answer:
      "It is helpful to bring any previous dental records, a list of medications, and details of any relevant medical history. Specific guidance is confirmed by the clinic.",
  },
  {
    question: "Does the website provide dental advice?",
    answer:
      "Information on this website is educational and does not replace a professional consultation. Treatment suitability requires an examination.",
  },
];

export const implantFaqs: FAQ[] = [
  {
    question: "What are dental implants?",
    answer:
      "Dental implants are a way to replace missing teeth using a small titanium fixture that supports a custom-made restoration. Suitability is assessed through a consultation.",
  },
  {
    question: "How is implant treatment planned?",
    answer:
      "Treatment begins with a careful evaluation and personalised planning. Your dentist explains the general stages that may be involved for your situation.",
  },
  {
    question: "What questions should I ask during a consultation?",
    answer:
      "You may wish to ask about suitability, the general stages, the expected timeframe, aftercare, and what to expect during recovery.",
  },
  {
    question: "How long does treatment take?",
    answer:
      "Timelines differ between patients based on individual factors. Your dentist will explain a general timeframe after examination.",
  },
];

export const visitFaqs: FAQ[] = [
  {
    question: "How do I prepare for my first visit?",
    answer:
      "Arrive a little early if you can, and bring any relevant dental or medical records. The clinic will confirm anything else that is helpful to bring.",
  },
  {
    question: "What happens during a consultation?",
    answer:
      "A consultation usually involves a discussion of your dental history, an examination, and a clear explanation of any suitable options.",
  },
  {
    question: "Can I reschedule an appointment?",
    answer:
      "Yes. Please contact the clinic by phone or WhatsApp as early as possible to reschedule. The clinic's cancellation policy will be confirmed.",
  },
];

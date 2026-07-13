/**
 * Treatment directory content.
 *
 * IMPORTANT: This is a *provisional* list generated for layout and demonstration.
 * Every item is marked `verifiedByClinic: false` and must be confirmed by the
 * clinic before publishing. Copy is written in calm, non-diagnostic language and
 * deliberately avoids guarantees or promised outcomes.
 */

export type TreatmentCategory =
  | "General Dentistry"
  | "Restorative Dentistry"
  | "Prosthodontics"
  | "Dental Implants"
  | "Cosmetic Dentistry"
  | "Preventive Care";

export const treatmentCategories: TreatmentCategory[] = [
  "General Dentistry",
  "Restorative Dentistry",
  "Prosthodontics",
  "Dental Implants",
  "Cosmetic Dentistry",
  "Preventive Care",
];

export interface TreatmentFAQ {
  question: string;
  answer: string;
}

export interface Treatment {
  slug: string;
  title: string;
  category: TreatmentCategory;
  shortDescription: string;
  overview: string;
  benefits: string[];
  whoMayBenefit: string;
  consultation: string;
  journey: string[];
  faq: TreatmentFAQ[];
  related: string[];
  /** Filename inside /public/images or a generated asset. */
  image: string;
  video?: string;
  verifiedByClinic: boolean;
}

const disclaimerConsult =
  "A consultation and examination are needed to understand whether this treatment is suitable for you. Every plan is personalised.";

export const treatments: Treatment[] = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    category: "Dental Implants",
    shortDescription:
      "A carefully planned approach to replacing missing teeth with a natural-looking, stable foundation.",
    overview:
      "Dental implants are a way to replace one or more missing teeth using a small titanium fixture that supports a custom restoration. Treatment begins with a thorough evaluation and personalised planning to understand whether implants may be suitable for you.",
    benefits: [
      "Support for a natural-looking restoration",
      "Helps restore chewing comfort and confidence",
      "Designed to fit your individual anatomy",
      "Planned around your long-term dental health",
    ],
    whoMayBenefit:
      "People with one or more missing teeth who would like to explore a fixed replacement option. Suitability is always confirmed through examination.",
    consultation:
      "During a consultation, Dr. Sibi reviews your dental history, examines the area and discusses whether implant treatment is appropriate, along with the general stages involved.",
    journey: [
      "Consultation and evaluation",
      "Personalised treatment planning",
      "Placement of the implant fixture",
      "Healing period",
      "Fitting the abutment and restoration",
      "Follow-up care",
    ],
    faq: [
      {
        question: "How long does implant treatment take?",
        answer:
          "Timelines vary between patients depending on individual factors. Your dentist will explain a general timeframe after examination.",
      },
      {
        question: "Is the treatment right for everyone?",
        answer:
          "Not always. Suitability depends on several factors that can only be assessed through a consultation and examination.",
      },
    ],
    related: ["crowns-and-bridges", "prosthodontic-care", "smile-restoration"],
    image: "/images/room.webp",
    video: "/videos/implant-assembly.mp4",
    verifiedByClinic: false,
  },
  {
    slug: "crowns-and-bridges",
    title: "Crowns and Bridges",
    category: "Prosthodontics",
    shortDescription:
      "Custom restorations that rebuild the shape, function and appearance of damaged or missing teeth.",
    overview:
      "Crowns cover and protect an individual tooth, while bridges help replace one or more missing teeth by connecting to neighbouring teeth. Both are custom made to blend with your smile.",
    benefits: [
      "Helps restore natural tooth shape and function",
      "Custom shade matching",
      "Supports comfortable everyday use",
    ],
    whoMayBenefit:
      "People with a damaged, weakened or missing tooth who would like to discuss restorative options.",
    consultation:
      "Your dentist examines the tooth and surrounding area and explains which restorative approaches may be appropriate for your situation.",
    journey: [
      "Consultation and examination",
      "Treatment planning and shade selection",
      "Preparation and impressions",
      "Fitting the custom restoration",
      "Review and follow-up",
    ],
    faq: [
      {
        question: "Will the restoration match my other teeth?",
        answer:
          "Restorations are custom made and shade matched during planning so they blend naturally with your smile.",
      },
    ],
    related: ["dental-implants", "prosthodontic-care", "cosmetic-dentistry"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "dentures",
    title: "Dentures",
    category: "Prosthodontics",
    shortDescription:
      "Removable replacements for missing teeth, designed for comfort and a natural appearance.",
    overview:
      "Dentures are custom-made removable appliances that replace missing teeth and surrounding tissue. They are planned around comfort, fit and appearance.",
    benefits: [
      "Helps restore the ability to eat and speak comfortably",
      "Custom fit for your mouth",
      "Natural-looking appearance",
    ],
    whoMayBenefit:
      "People missing several or all of their teeth who would like to discuss removable replacement options.",
    consultation:
      "A consultation helps determine the most appropriate type of denture and the general steps involved.",
    journey: [
      "Consultation and examination",
      "Impressions and measurements",
      "Design and fitting",
      "Adjustments for comfort",
      "Follow-up care",
    ],
    faq: [
      {
        question: "How do I care for dentures?",
        answer:
          "Your dentist will provide personalised aftercare guidance suited to the type of denture you receive.",
      },
    ],
    related: ["dental-implants", "prosthodontic-care", "crowns-and-bridges"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "prosthodontic-care",
    title: "Prosthodontic Care",
    category: "Prosthodontics",
    shortDescription:
      "Specialised care focused on restoring dental function, comfort and appearance.",
    overview:
      "Prosthodontics focuses on restoring and replacing teeth using tailored solutions. As a prosthodontist, Dr. Sibi combines careful planning with clear communication throughout treatment.",
    benefits: [
      "Focused on restoring function and comfort",
      "Personalised, considered treatment planning",
      "Attention to natural appearance",
    ],
    whoMayBenefit:
      "People considering complex restorative or replacement treatment who would value specialised planning.",
    consultation:
      "A detailed consultation helps map out an approach suited to your individual needs.",
    journey: [
      "Comprehensive consultation",
      "Personalised planning",
      "Staged treatment",
      "Review and refinement",
      "Ongoing follow-up",
    ],
    faq: [
      {
        question: "What is a prosthodontist?",
        answer:
          "A prosthodontist is a dentist with additional training focused on restoring and replacing teeth.",
      },
    ],
    related: ["dental-implants", "crowns-and-bridges", "dentures"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "Restorative Dentistry",
    shortDescription:
      "A treatment that helps relieve pain and preserve a tooth affected by deep decay or infection.",
    overview:
      "Root canal treatment aims to relieve discomfort and retain a natural tooth that has been affected by deep decay or infection. Your dentist will explain the process clearly before beginning.",
    benefits: [
      "Aims to preserve your natural tooth",
      "Helps relieve associated discomfort",
      "Restores everyday function",
    ],
    whoMayBenefit:
      "People experiencing tooth discomfort or who have been advised that a tooth may need this treatment.",
    consultation:
      "An examination helps determine whether root canal treatment is appropriate and what the general steps involve.",
    journey: [
      "Examination and assessment",
      "Clear explanation of the process",
      "Treatment appointment(s)",
      "Restoration of the tooth",
      "Follow-up review",
    ],
    faq: [
      {
        question: "Is root canal treatment uncomfortable?",
        answer:
          "Comfort is a priority throughout treatment. Your dentist will discuss what to expect during your consultation.",
      },
    ],
    related: ["crowns-and-bridges", "general-dentistry", "tooth-extraction"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    category: "Cosmetic Dentistry",
    shortDescription:
      "Thoughtful treatments that help enhance the natural appearance of your smile.",
    overview:
      "Cosmetic dentistry brings together a range of treatments focused on the appearance of your smile, always planned around your natural features and dental health.",
    benefits: [
      "Focus on a natural, balanced appearance",
      "Personalised to your features",
      "Planned alongside dental health",
    ],
    whoMayBenefit:
      "People who would like to discuss the appearance of their smile with careful, health-first planning.",
    consultation:
      "A consultation helps understand your goals and which options may suit you.",
    journey: [
      "Consultation and smile assessment",
      "Personalised planning",
      "Treatment",
      "Review and refinement",
    ],
    faq: [
      {
        question: "Will results look natural?",
        answer:
          "Treatment is planned around your natural features with the aim of a balanced, natural-looking result.",
      },
    ],
    related: ["smile-restoration", "teeth-cleaning", "crowns-and-bridges"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "smile-restoration",
    title: "Smile Restoration",
    category: "Restorative Dentistry",
    shortDescription:
      "Comprehensive planning to restore function and appearance across your smile.",
    overview:
      "Smile restoration brings together restorative and prosthodontic treatments into one considered plan, focused on function, comfort and appearance.",
    benefits: [
      "A coordinated, staged approach",
      "Focus on both function and appearance",
      "Personalised planning",
    ],
    whoMayBenefit:
      "People considering broader treatment across several teeth who would value a coordinated plan.",
    consultation:
      "A thorough consultation helps outline a general roadmap suited to your needs.",
    journey: [
      "Comprehensive consultation",
      "Coordinated treatment plan",
      "Staged treatment",
      "Review and follow-up",
    ],
    faq: [
      {
        question: "How is a restoration plan created?",
        answer:
          "Planning begins with a careful evaluation and clear discussion of the available options.",
      },
    ],
    related: ["prosthodontic-care", "dental-implants", "cosmetic-dentistry"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "teeth-cleaning",
    title: "Teeth Cleaning",
    category: "Preventive Care",
    shortDescription:
      "Professional cleaning that supports healthy teeth and gums.",
    overview:
      "Professional teeth cleaning helps remove build-up and supports the health of your teeth and gums as part of preventive care.",
    benefits: [
      "Supports gum health",
      "Helps maintain a fresh, clean feeling",
      "Part of routine preventive care",
    ],
    whoMayBenefit:
      "Most people benefit from routine professional cleaning as part of preventive care.",
    consultation:
      "Your dentist can advise on a suitable routine based on your individual needs.",
    journey: [
      "Assessment",
      "Professional cleaning",
      "Personalised guidance",
      "Routine review",
    ],
    faq: [
      {
        question: "How often should I have a cleaning?",
        answer:
          "Frequency depends on your individual needs, which your dentist can discuss with you.",
      },
    ],
    related: ["preventive-dental-care", "general-dentistry", "cosmetic-dentistry"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "tooth-extraction",
    title: "Tooth Extraction",
    category: "General Dentistry",
    shortDescription:
      "Careful removal of a tooth when it is the most appropriate option.",
    overview:
      "Tooth extraction is considered when preserving a tooth is not the most appropriate option. Your dentist will explain why and what to expect beforehand.",
    benefits: [
      "Considered only when appropriate",
      "Clear explanation beforehand",
      "Guidance on replacement options where relevant",
    ],
    whoMayBenefit:
      "People who have been advised that a tooth may need to be removed, or who are experiencing related discomfort.",
    consultation:
      "An examination helps determine whether extraction is appropriate and discusses replacement options where relevant.",
    journey: [
      "Examination and assessment",
      "Clear explanation",
      "The procedure",
      "Aftercare guidance",
      "Discussion of replacement options",
    ],
    faq: [
      {
        question: "What happens after an extraction?",
        answer:
          "You will receive personalised aftercare guidance, and your dentist can discuss replacement options if relevant.",
      },
    ],
    related: ["dental-implants", "general-dentistry", "root-canal-treatment"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "preventive-dental-care",
    title: "Preventive Dental Care",
    category: "Preventive Care",
    shortDescription:
      "Regular care and guidance that helps look after your long-term dental health.",
    overview:
      "Preventive care focuses on looking after your dental health over time through regular check-ups, cleaning and personalised guidance.",
    benefits: [
      "Supports long-term dental health",
      "Personalised guidance",
      "Helps identify concerns early",
    ],
    whoMayBenefit:
      "Everyone can benefit from regular preventive care suited to their needs.",
    consultation:
      "Your dentist can recommend a preventive routine based on your individual situation.",
    journey: [
      "Check-up and assessment",
      "Professional cleaning where needed",
      "Personalised guidance",
      "Regular review",
    ],
    faq: [
      {
        question: "Why is preventive care important?",
        answer:
          "Regular care helps look after your dental health and can help identify concerns earlier.",
      },
    ],
    related: ["teeth-cleaning", "general-dentistry", "cosmetic-dentistry"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    category: "General Dentistry",
    shortDescription:
      "Everyday dental care, check-ups and treatments to keep your smile healthy.",
    overview:
      "General dentistry covers routine check-ups, everyday treatments and guidance that support the ongoing health of your teeth and gums.",
    benefits: [
      "Routine, everyday dental care",
      "Clear guidance and communication",
      "A calm, comfortable environment",
    ],
    whoMayBenefit:
      "Everyone benefits from routine general dental care.",
    consultation:
      "A check-up helps understand your dental health and any care that may be helpful.",
    journey: [
      "Check-up and examination",
      "Discussion of findings",
      "Any recommended care",
      "Regular review",
    ],
    faq: [
      {
        question: "How often should I visit?",
        answer:
          "Your dentist can recommend a routine suited to your individual needs.",
      },
    ],
    related: ["preventive-dental-care", "teeth-cleaning", "root-canal-treatment"],
    image: "/images/room.webp",
    verifiedByClinic: false,
  },
];

export const treatmentsBySlug = new Map(treatments.map((t) => [t.slug, t]));

export function getTreatment(slug: string): Treatment | undefined {
  return treatmentsBySlug.get(slug);
}

export function getRelatedTreatments(slug: string): Treatment[] {
  const t = treatmentsBySlug.get(slug);
  if (!t) return [];
  return t.related
    .map((s) => treatmentsBySlug.get(s))
    .filter((x): x is Treatment => Boolean(x));
}

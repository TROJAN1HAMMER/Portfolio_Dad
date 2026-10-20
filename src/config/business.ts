/**
 * Centralized Business Configuration for Balasubramanya MG - Insurance Advisor
 * 
 * All verified contact details, associated organizations, and metadata are centralized
 * here for single-source updates.
 */

export interface InsuranceServiceConfig {
  id: 'health' | 'life' | 'general' | 'motor' | 'travel' | 'home' | 'other';
  title: string;
  organization: string;
  tagline: string;
  description: string;
  features: string[];
  ctaLabel: string;
  defaultCategory: string;
}

export const BUSINESS_CONFIG = {
  advisor: {
    fullName: 'Balasubramanya MG',
    initials: 'BM',
    title: 'Insurance Advisor',
    tagline: 'Personal Insurance Guidance for Health, Life & General Protection',
    phoneRaw: '9388883331',
    phoneFormatted: '+91 9388883331',
    email: 'balaharshith@gmail.com',
    countryCode: '+91',
    serviceRegion: 'India', // Configurable region
    // The profile picture placeholder configuration.
    // When the actual photograph is available, set `usePhoto: true` and specify `photoPath`.
    profilePicture: {
      usePhoto: false, // Set to true when actual photo is added
      photoPath: '/assets/advisor-portrait.jpg', // Place the real image in public/assets or src/assets
      altText: 'Balasubramanya MG - Insurance Advisor',
      objectPosition: 'center 20%', // Adjust crop centering if necessary
    },
  },

  associatedOrganizations: [
    {
      name: 'Star Health and Allied Insurance',
      shortName: 'Star Health',
      category: 'Health Insurance',
      description: 'Individual & Family Medical Coverages',
    },
    {
      name: 'SBI Life Insurance',
      shortName: 'SBI Life',
      category: 'Life & Financial Planning',
      description: 'Family Protection & Long-term Savings',
    },
    {
      name: 'ICICI Lombard General Insurance',
      shortName: 'ICICI Lombard',
      category: 'General Insurance',
      description: 'Motor, Travel & Property Protection',
    },
  ],

  services: [
    {
      id: 'health',
      title: 'Health Insurance',
      organization: 'Star Health Insurance',
      tagline: 'Healthcare & Hospitalization Protection',
      description:
        'Explore health insurance options designed to help individuals and families manage eligible medical expenses and prepare for unexpected healthcare needs.',
      features: [
        'Individual and family health insurance options',
        'Hospitalization-related coverage guidance',
        'Understanding policy benefits and exclusions',
        'Guidance on comparing available plans',
      ],
      ctaLabel: 'Explore Health Insurance',
      defaultCategory: 'Health',
    },
    {
      id: 'life',
      title: 'Life Insurance',
      organization: 'SBI Life Insurance',
      tagline: 'Family Protection & Financial Goals',
      description:
        'Explore life insurance and other available solutions that can help you plan for your family\'s financial future and long-term goals.',
      features: [
        'Life protection options for family security',
        'Family financial and goal planning',
        'Savings and long-term financial perspectives',
        'Retirement and child-related plans, where available',
      ],
      ctaLabel: 'Explore Life Insurance',
      defaultCategory: 'Life',
    },
    {
      id: 'general',
      title: 'General Insurance',
      organization: 'ICICI Lombard General Insurance',
      tagline: 'Motor, Travel & Property Coverage',
      description:
        'Explore general insurance options for vehicles, travel, homes and other eligible insurance needs.',
      features: [
        'Motor insurance (Four Wheeler & Two Wheeler)',
        'Domestic & International travel insurance',
        'Home and asset protection plans',
        'Other available general insurance products',
      ],
      ctaLabel: 'Explore General Insurance',
      defaultCategory: 'Motor',
    },
  ] as InsuranceServiceConfig[],

  whyChooseMe: [
    {
      title: 'Personalized Guidance',
      description: 'Discuss and understand your insurance options tailored to your specific needs, family situation and budget.',
      icon: 'UserCheck',
    },
    {
      title: 'Clear Explanations',
      description: 'Get help demystifying policy features, waiting periods, inclusions, exclusions and key terms before choosing.',
      icon: 'HelpCircle',
    },
    {
      title: 'Multiple Insurance Categories',
      description: 'Conveniently explore health, life and general insurance through a single trusted advisor relationship.',
      icon: 'Layers',
    },
    {
      title: 'Ongoing Assistance',
      description: 'Assistance with policy-related queries and clarity on appropriate insurer support and servicing channels.',
      icon: 'Headphones',
    },
  ],

  howItWorks: [
    {
      step: '01',
      title: 'Tell Me Your Needs',
      description: 'Share what you want to protect, your family priorities, timeline and any questions you currently have.',
    },
    {
      step: '02',
      title: 'Explore Your Options',
      description: 'Discuss relevant available plans, policy features, costs, exclusions and eligibility terms in plain language.',
    },
    {
      step: '03',
      title: 'Make an Informed Decision',
      description: 'Choose whether and how to proceed only after reviewing the applicable policy documents, terms and conditions.',
    },
  ],

  faqs: [
    {
      question: 'Which types of insurance can I enquire about?',
      answer:
        'You can enquire about health, life and general insurance options, including motor (car/bike), travel and home insurance, subject to the products available through Star Health, SBI Life and ICICI Lombard.',
    },
    {
      question: 'How do I choose the right insurance plan?',
      answer:
        'The right option depends on your needs, budget, existing coverage, eligibility and financial priorities. You can discuss these factors with your advisor and review the applicable policy terms before making any decision.',
    },
    {
      question: 'Can I enquire through WhatsApp?',
      answer:
        'Yes. You can tap the WhatsApp button anywhere on this website to start a direct chat with your details and questions pre-filled.',
    },
    {
      question: 'Can I compare insurance options before deciding?',
      answer:
        'Yes, you can ask about relevant available plans, premiums, coverage, exclusions, waiting periods and other policy conditions before making any decision.',
    },
    {
      question: 'Does submitting an enquiry purchase an insurance policy?',
      answer:
        'No. An enquiry does not purchase a policy or guarantee coverage. Any purchase is subject to the respective insurer\'s applicable application, underwriting and policy terms.',
    },
    {
      question: 'How can I contact Balasubramanya MG?',
      answer:
        'You can call directly at +91 9388883331, email balaharshith@gmail.com, or send a WhatsApp message using the links on this website.',
    },
  ],

  seo: {
    title: 'Balasubramanya MG | Health, Life & General Insurance Advisor',
    description:
      'Explore health, life, motor, travel and home insurance options with Balasubramanya MG. Call or WhatsApp for personalized insurance guidance.',
    canonicalUrl: 'https://balasubramanya-insurance.com', // Update with actual domain upon deployment
    siteName: 'Balasubramanya MG - Insurance Advisor',
    locale: 'en_IN',
  },

  disclaimer:
    'Insurance products are subject to the terms, conditions, exclusions and eligibility requirements of the respective insurer. Information on this website is for general informational purposes and does not constitute a guarantee of coverage, claim approval or financial returns. Please review the applicable policy documents before purchasing. Balasubramanya MG provides assistance as an independent advisor with products associated with Star Health, SBI Life and ICICI Lombard. All company names, logos and registered trademarks belong to their respective owners. This website is not the official website of any insurer and is not jointly operated by them.',
};

/**
 * Builds a direct WhatsApp click-to-chat URL with a prefilled message
 */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/91${BUSINESS_CONFIG.advisor.phoneRaw}`;
  const defaultText = `Hello Balasubramanya sir, I visited your website and would like to discuss insurance options with you.`;
  const text = message ? message.trim() : defaultText;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a tel: URI
 */
export function buildTelUrl(): string {
  return `tel:+91${BUSINESS_CONFIG.advisor.phoneRaw}`;
}

/**
 * Builds a mailto: URI with optional subject
 */
export function buildMailtoUrl(subject?: string, body?: string): string {
  const email = BUSINESS_CONFIG.advisor.email;
  const s = subject ? encodeURIComponent(subject) : encodeURIComponent('Insurance Enquiry - Website Visitor');
  const b = body ? `&body=${encodeURIComponent(body)}` : '';
  return `mailto:${email}?subject=${s}${b}`;
}

export type LanguageCode = 'en' | 'hi' | 'ml' | 'kn' | 'ta';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
];

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
  };
  header: {
    advisorName: string;
    advisorRole: string;
    navHome: string;
    navAbout: string;
    navServices: string;
    navWhyMe: string;
    navFaq: string;
    navContact: string;
    callNow: string;
    selectLanguage: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    description: string;
    callCta: string;
    whatsappCta: string;
    trustGuidance: string;
    trustText: string;
    assistingWith: string;
    floatingCoverageTitle: string;
    floatingCoverageSub: string;
    regionBadge: string;
  };
  services: {
    tag: string;
    title: string;
    subtitle: string;
    whatWeHelpExplore: string;
    starHealth: {
      title: string;
      org: string;
      tagline: string;
      desc: string;
      features: string[];
      cta: string;
    };
    sbiLife: {
      title: string;
      org: string;
      tagline: string;
      desc: string;
      features: string[];
      cta: string;
      badgeTerm: string;
      badgeChild: string;
    };
    iciciLombard: {
      title: string;
      org: string;
      tagline: string;
      desc: string;
      features: string[];
      cta: string;
      badgeHealth: string;
    };
    whatsappEnquiryBtn: string;
    disclaimerCallout: string;
  };
  whyMe: {
    tag: string;
    title: string;
    subtitle: string;
    clientFirst: string;
    cards: Array<{
      title: string;
      desc: string;
    }>;
    bannerTitle: string;
    bannerDesc: string;
  };
  about: {
    tag: string;
    title: string;
    servingAcross: string;
    leadP: string;
    bioP1: string;
    bioP2: string;
    assocTitle: string;
    starCategory: string;
    sbiCategory: string;
    iciciCategory: string;
    commitments: string[];
    whatsappCta: string;
    directCall: string;
    languagesSpoken: {
      heading: string;
      supportingText: string;
      languages: Array<{
        native: string;
        english: string;
      }>;
      note: string;
    };
  };
  howItWorks: {
    tag: string;
    title: string;
    subtitle: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
    cta: string;
    note: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    note: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  contact: {
    tag: string;
    title: string;
    subtitle: string;
    directHeading: string;
    directLead: string;
    callLabel: string;
    callAction: string;
    whatsappLabel: string;
    whatsappAction: string;
    emailLabel: string;
    emailAction: string;
    assuranceTitle: string;
    assuranceDesc: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    formEmailLabel: string;
    emailPlaceholder: string;
    categoryLabel: string;
    preferredMethodLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    consentTextPre: string;
    consentPrivacyLink: string;
    consentTextPost: string;
    submitBtn: string;
    privacyNote: string;
    handoffReadyTitle: string;
    handoffReadyDesc: string;
    handoffSendWhatsapp: string;
    handoffSendEmail: string;
    handoffReset: string;
    categories: {
      healthStar: string;
      healthIcici: string;
      lifeSbi: string;
      termSbi: string;
      childSbi: string;
      motorIcici: string;
      travelIcici: string;
      homeIcici: string;
      otherGeneral: string;
    };
    methods: {
      whatsapp: string;
      call: string;
      email: string;
    };
    errors: {
      nameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
      consentRequired: string;
    };
  };
  footer: {
    brandDesc: string;
    quickLinks: string;
    associatedInsurers: string;
    complianceHeading: string;
    privacyNotice: string;
    legalDisclaimer: string;
    verifiedContact: string;
    disclaimerTitle: string;
    disclaimerText: string;
    copyright: string;
    builtWith: string;
  };
  privacyModal: {
    privacyTab: string;
    disclaimerTab: string;
    closeBtn: string;
    privacyTitle: string;
    privacyIntro: string;
    h1Title: string;
    h1List: string[];
    h2Title: string;
    h2Desc: string;
    h3Title: string;
    h3Desc: string;
    disclaimerTitle: string;
    alertTitle: string;
    independentTitle: string;
    independentDesc1: string;
    independentDesc2: string;
    guaranteeTitle: string;
    guaranteeDesc: string;
  };
  floating: {
    callNow: string;
    whatsapp: string;
    desktopTooltip: string;
  };
  whatsappMessages: {
    generalGreeting: string;
    categoryInquiry: (category: string, org?: string) => string;
    scheduleConsultation: string;
  };
}

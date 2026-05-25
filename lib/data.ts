import type {
  NavLink,
  ServiceItem,
  ProcessStep,
  Testimonial,
  TeamMember,
  FAQItem,
  BlogPost,
  InstagramPost,
  BusinessHour,
  ContactInfo,
  FooterLink,
  SocialLink,
  MetricItem,
  BrandLogo,
} from "./types";

/* ── Framer CDN base ─────────────────────────────────────── */
const F = "https://framerusercontent.com";

export const LOGO: BrandLogo = {
  url:  undefined,
  alt:  "DentaCare",
  name: "DentaCare",
};

export const FAVICON = {};   // falls back to app/favicon.ico when empty

export const TERMS_URL = "#";

export const MARQUEE_ITEMS: string[] = [
  "Dental Braces",
  "Teeth Implants",
  "Dental Filling",
  "Cosmetic Dentistry",
  "Teeth Checkup",
  "Teeth Whitening",
  "Gum Care",
  "Root Canal",
  "Veneers",
  "Clear Aligners",
];

export const NAV_LINKS: NavLink[] = [
  { label: "About",      href: "#about" },
  { label: "Services",   href: "#services" },
  { label: "Blog",       href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

export const BOOKING_URL = "https://calendly.com";

export const HERO = {
  headline: "Bright Smiles,\nExpert Care",
  body: "Our skilled team provides pain-free, advanced dental treatments in a welcoming environment — because your smile deserves the best. From routine checkups to cosmetic fixes, we prioritise your comfort with cutting-edge technology and compassionate care.",
  image: `${F}/images/4oQF2qlQ3UGFtGaeL6OxdUYyDxI.png`,
  imageAlt: "Smiling woman with perfect teeth",
  trustCard: {
    support: { label: "Support", value: "24/7 Care Support" },
    ratings: { label: "Ratings", value: "2000+ 5-Star Reviews" },
  },
};

export const ABOUT = {
  badge: "About Us",
  headline:
    "At Denta Care, we prioritize your smile with expert dental care in a comfortable, modern setting.",
  videoSrc: `${F}/assets/2yfJ74hOtPRORgu9xWEyxNgVlPM.mp4`,
};

export const METRICS: MetricItem[] = [
  { value: "15+", label: "Years Experience",    description: "24/7 Care Support" },
  { value: "20+", label: "Dental Specialists",  description: "Expert team across all disciplines" },
  { value: "500+", label: "Patients Helped",    description: "Happy smiles worldwide" },
];

export const SERVICES_SECTION = {
  badge: "Services",
  headline: "Personalized solutions\nfor better oral health",
};

export const SERVICES: ServiceItem[] = [
  {
    id: "general-dentistry",
    label: "General Dentistry",
    headline: "General Dentistry",
    description:
      "Our general dentistry services focus on maintaining optimal oral health through preventive care, early diagnosis, and effective treatments to keep your teeth and gums healthy for life.",
    treatments: [
      "Dental Checkups & Exams",
      "Professional Teeth Cleaning",
      "Digital X-Rays & Diagnostics",
      "Cavity Fillings",
      "Gum Care & Treatment",
    ],
    image: `${F}/images/o6TcRKbdukNsaYCl8OH6YhJKE.png`,
    imageAlt: "Dentist examining patient",
    imagePosition: "left",   // image LEFT, content RIGHT
  },
  {
    id: "cosmetic-dentistry",
    label: "Cosmetic Dentistry",
    headline: "Cosmetic Dentistry",
    description:
      "Enhance the beauty of your smile with our specialised cosmetic treatments designed to improve color, shape, alignment, and overall appearance.",
    treatments: [
      "Teeth Whitening",
      "Dental Veneers",
      "Smile Makeover",
      "Tooth Contouring & Reshaping",
      "Bonding & Composite Fillings",
    ],
    image: `${F}/images/ocwjmyhaxcxRyxfQsxMNtlQC1vA.png`,
    imageAlt: "Patient with bright cosmetic smile",
    imagePosition: "right",  // content LEFT, image RIGHT
  },
  {
    id: "restorative-dentistry",
    label: "Restorative Dentistry",
    headline: "Restorative Dentistry",
    description:
      "Restore function, comfort, and confidence with durable solutions that repair damaged or missing teeth using modern restorative techniques.",
    treatments: [
      "Dental Implants",
      "Crowns & Bridges",
      "Dentures (Full & Partial)",
      "Inlays & Onlays",
      "Tooth Restoration",
    ],
    image: `${F}/images/65faYj1N1G0nWtw03SK09SGfd0.png`,
    imageAlt: "Restorative dental procedure",
    imagePosition: "left",   // image LEFT, content RIGHT
  },
  {
    id: "orthodontic-treatment",
    label: "Orthodontic Treatment",
    headline: "Orthodontic Treatment",
    description:
      "Achieve a perfectly aligned smile with our orthodontic solutions tailored to your age, lifestyle, and goals — from traditional braces to discreet clear aligners.",
    treatments: [
      "Metal & Ceramic Braces",
      "Clear Aligners",
      "Retainers",
      "Bite Correction",
      "Early Orthodontic Care",
    ],
    image: `${F}/images/5m8qZIZ8adf6bvIFWwhJgnVwIk.png`,
    imageAlt: "Orthodontic treatment in progress",
    imagePosition: "right",  // content LEFT, image RIGHT
  },
];

export const PROCESS_SECTION = {
  badge: "Our Process",
  headline: "Our process is simple,\npurposeful, & adaptable.",
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Schedule your visit",
    description:
      "Book an appointment at your convenience through our easy scheduling system, and we'll ensure a hassle-free experience from the start.",
    image: `${F}/images/nHl8roFWPHjBfSPjavAVpCDtIMk.webp`,
    imageAlt: "Doctor consulting with patient",
  },
  {
    step: 2,
    title: "Personalized consultation",
    description:
      "Meet with our expert dental team to discuss your needs, goals, and tailored treatment options designed just for you.",
    image: `${F}/images/IRKIsXCCh3fPxqXibVMVRnYr5Y.webp`,
    imageAlt: "Patient smiling during consultation",
  },
  {
    step: 3,
    title: "Begin your journey",
    description:
      "Medical knowledge and practices continually evolve — we perfectly match your treatment goals with early, proactive interventions.",
    image: `${F}/images/rtjvX4cnDQYgl9LEjFkUQV7yo.webp`,
    imageAlt: "Dentist treating patient",
  },
];

export const TESTIMONIALS_SECTION = {
  badge: "Testimonials",
  headline: "What our patients say about us",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "johny-nap",
    name: "Johny Nap",
    role: "Patient",
    quote:
      "From my fear of drills to actually enjoying dentist visits — Denta Care changed everything. The team explained each step, genuinely comfortable. 12/10",
    rating: 5,
    avatar: `${F}/images/dXP8tfXxDte2pd4allUVkC8Cg.webp`,
  },
  {
    id: "sean-smith",
    name: "Sean Smith",
    role: "Patient",
    quote:
      "After years of hiding my teeth I got veneers here. The results look so natural! The dentist listened to my goals and delivered beyond expectations.",
    rating: 5,
    avatar: `${F}/images/5qWx3YUHQQHhBq5lOP2N4UyePv8.png`,
  },
  {
    id: "abil-gulal",
    name: "Abil Gulal",
    role: "Parent",
    quote:
      "My 8-year-old usually fights checkups, but the paediatric specialist made her laugh. Now she asks when we're going back. Gentle & playful approach.",
    rating: 5,
    avatar: `${F}/images/ub9sxoVRTZ5FoyrBum3wT4Pto.png`,
  },
];

export const TEAM_SECTION = {
  badge: "Team",
  headline: "Meet our dental team",
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "wade-warren",
    name: "Wade Warren",
    role: "Department Head",
    image: `${F}/images/gwZvyNCBhIa0xKljIo2Pu4IC2c.png`,
  },
  {
    id: "lanny-cooper",
    name: "Lanny Cooper",
    role: "Department Head",
    image: `${F}/images/kbV6cb5pOgPvnqWG1kyzCCJss.png`,
  },
  {
    id: "esther-howard",
    name: "Esther Howard",
    role: "Dental HOD",
    image: `${F}/images/6l0GL5Rq17nNYEGmzs4W590VaKs.png`,
  },
  {
    id: "katty-leon",
    name: "Katty Leon",
    role: "Dental Officer",
    image: `${F}/images/4155mbp6ELQUD51grslj2yCZcrU.png`,
  },
  {
    id: "jane-cooper",
    name: "Jane Cooper",
    role: "Medical Officer",
    image: `${F}/images/IXzsQK4iP9slrkxDc2w4Smmi2o.png`,
  },
];

export const FAQ_SECTION = {
  badge: "FAQ",
  headline: "Got questions?\nWe've got answers",
  image: `${F}/images/2qMzNaUVfi1OHTrH32Nrek1JEI.webp`,
  imageAlt: "Doctor speaking with patient",
};

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "visit-frequency",
    question: "How often should I visit the dentist?",
    answer:
      "We recommend visiting every 6 months for a routine checkup and cleaning. However, patients with gum disease, cavities, or other ongoing concerns may need more frequent visits. Your dentist will advise the ideal schedule for your specific needs.",
  },
  {
    id: "insurance",
    question: "Do you accept insurance?",
    answer:
      "Yes, we accept most major dental insurance plans. Our front desk team will help verify your coverage and process claims on your behalf. We also offer flexible payment plans for uninsured or underinsured patients.",
  },
  {
    id: "pain",
    question: "Is treatment painful?",
    answer:
      "We prioritise pain-free care. Most procedures are performed under local anaesthesia, and we offer sedation options for anxious patients. Our team uses the latest techniques to minimise discomfort at every step.",
  },
  {
    id: "emergency",
    question: "What if I have a dental emergency?",
    answer:
      "We offer same-day emergency appointments for urgent situations such as severe toothache, broken teeth, or lost fillings. Call our helpline and we'll prioritise your care immediately.",
  },
  {
    id: "cost",
    question: "How much does a consultation cost?",
    answer:
      "Initial consultations start from a transparent flat fee. We provide a full treatment plan with itemised costs before any work begins, so there are never any surprise charges.",
  },
];

export const BLOG_SECTION = {
  badge: "Blog",
  headline: "Latest news",
  viewAllUrl: "#blog",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "5-signs-checkup",
    title: "5 Signs You Need a Checkup",
    excerpt:
      "A quick guide to subtle oral health red flags like gum bleeding or morning jaw pain. Learn when 'waiting it out' works for the dentist.",
    image: `${F}/images/Nf5MSvE9Wt31ZGtyyNtpTA.png`,
    imageAlt: "Dental checkup in progress",
    href: "/blog/5-signs-you-need-a-checkup",
  },
  {
    id: "professional-vs-regular",
    title: "Professional vs. Regular clinic",
    excerpt:
      "We break down the pros/cons of clinic-grade whitening vs strips/DIY methods — plus what actually works for stubborn coffee stains.",
    image: `${F}/images/stHt0Yn2Df3rvL6n2m9P4lQ4c8.png`,
    imageAlt: "Teeth whitening comparison",
    href: "/blog/professional-vs-regular-whitening",
  },
];

export const INSTAGRAM_SECTION = {
  badge: "Follow Us",
  headline: "We're DentaCare on Instagram",
  handle: "Instagram",
  href: "https://instagram.com",
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    image: `${F}/images/J8q5VeBcyM9YOCVBNqkXpres.webp`,
    alt: "Dental professional at work",
  },
  {
    id: "ig-2",
    image: `${F}/images/JZhhCdQ7HnsFp7PH89WwE54plk.webp`,
    alt: "Dental procedure close-up",
  },
  {
    id: "ig-3",
    image: `${F}/images/sXRSI31Ev0ovdCeHFiuZV946150.webp`,
    alt: "Dental professionals",
  },
  {
    id: "ig-4",
    image: `${F}/images/toPEGFqAlhldQmRgyPXzf3J7St0.webp`,
    alt: "Patient smiling",
  },
];

export const CTA_SECTION = {
  headline: "Book your next dental\ncare visit today",
  body: "Indulge in complete relaxation and rejuvenation. Schedule your appointment now to experience the ultimate luxury spa and wellness getaway.",
  imageLeft:    `${F}/images/XvDsTSNFzzQC1OSuNQZag03Chs.png`,
  imageRight:   `${F}/images/bRAh1sbadmCrfYXa8QoVSnVG60.png`,
  imageLeftAlt:  "Patient brushing teeth",
  imageRightAlt: "Smiling woman",
};

export const CONTACT_INFO: ContactInfo = {
  email:   "uiuxocean@gmail.com",
  phone:   "+91 95744 68870",
  address: "Ahmedabad, India",
};

export const BUSINESS_HOURS: BusinessHour[] = [
  { day: "Monday",    hours: "10:00 AM – 07:00 PM", isOpen: true },
  { day: "Tuesday",   hours: "10:00 AM – 07:00 PM", isOpen: true },
  { day: "Wednesday", hours: "10:00 AM – 07:00 PM", isOpen: true },
  { day: "Thursday",  hours: "10:00 AM – 07:00 PM", isOpen: true },
  { day: "Friday",    hours: "10:00 AM – 07:00 PM", isOpen: true },
  { day: "Saturday",  hours: "Closed",               isOpen: false },
  { day: "Sunday",    hours: "Closed",               isOpen: false },
];

export const FOOTER_MENU: FooterLink[] = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "#about" },
  { label: "Services",   href: "#services" },
  { label: "Blog",       href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Behance",   href: "https://behance.net" },
  { label: "LinkedIn",  href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X",         href: "https://x.com" },
];

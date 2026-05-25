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

// Utility — makes every key in T (and nested objects) optional.
// Arrays stay as-is so a brand can replace an entire list wholesale.
export type DeepPartial<T> = T extends Array<infer U>
  ? Array<U>
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// ── Aggregate shape matching lib/data.ts exports ─────────────────────────────

export interface BrandFavicon {
  icon?: string;       // 192×192 icon (any web-safe format)
  icon32?: string;     // 32×32 icon for browsers that prefer it
  apple?: string;      // 180×180 apple-touch-icon
}

export interface BrandContent {
  LOGO: BrandLogo;
  FAVICON: BrandFavicon;
  TERMS_URL: string;
  MARQUEE_ITEMS: string[];
  NAV_LINKS: NavLink[];
  BOOKING_URL: string;
  HERO: {
    headline: string;
    body: string;
    image: string;
    imageAlt: string;
    trustCard: {
      support: { label: string; value: string };
      ratings: { label: string; value: string };
    };
  };
  ABOUT: {
    badge: string;
    headline: string;
    videoSrc: string;
  };
  METRICS: MetricItem[];
  SERVICES_SECTION: { badge: string; headline: string };
  SERVICES: ServiceItem[];
  PROCESS_SECTION: { badge: string; headline: string };
  PROCESS_STEPS: ProcessStep[];
  TESTIMONIALS_SECTION: { badge: string; headline: string };
  TESTIMONIALS: Testimonial[];
  TEAM_SECTION: { badge: string; headline: string };
  TEAM_MEMBERS: TeamMember[];
  FAQ_SECTION: { badge: string; headline: string; image: string; imageAlt: string };
  FAQ_ITEMS: FAQItem[];
  BLOG_SECTION: { badge: string; headline: string; viewAllUrl: string };
  BLOG_POSTS: BlogPost[];
  INSTAGRAM_SECTION: { badge: string; headline: string; handle: string; href: string };
  INSTAGRAM_POSTS: InstagramPost[];
  CTA_SECTION: {
    headline: string;
    body: string;
    imageLeft: string;
    imageRight: string;
    imageLeftAlt: string;
    imageRightAlt: string;
  };
  CONTACT_INFO: ContactInfo;
  BUSINESS_HOURS: BusinessHour[];
  FOOTER_MENU: FooterLink[];
  SOCIAL_LINKS: SocialLink[];
  METADATA: {
    title: string;
    description: string;
    copyrightName: string;
  };
}

// ── Theme override schema ─────────────────────────────────────────────────────

export interface BrandTheme {
  // CSS variable overrides — keys map to @theme variable names in globals.css.
  // Only supply what you want to change; the rest inherits from the defaults.
  colors?: {
    // Primary accent family (replaces blush-*)
    primary?: {
      50?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
    };
    cream?: string;
    // Dark text family (replaces charcoal-*)
    dark?: {
      50?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      700?: string;
      800?: string;
      900?: string;
    };
    // Accent family (replaces mint-*)
    accent?: {
      100?: string;
      200?: string;
      400?: string;
    };
  };
  // Font family strings — CSS font-family value (e.g. "'Inter', sans-serif")
  fonts?: {
    display?: string;
    body?: string;
  };
  // Google Fonts stylesheet URL to load custom fonts for this brand.
  // Generate at https://fonts.google.com — e.g. "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
  googleFontsUrl?: string;
  radius?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    pill?: string;
  };
  // CSS color value applied as a full-bleed overlay on the hero background image.
  // Use rgba() for transparency, e.g. "rgba(0,0,0,0.4)". Omit for no overlay.
  heroOverlay?: string;
}

export interface LoadedBrand {
  slug: string;
  content: BrandContent;
  // CSS custom property overrides applied as inline style on <html>.
  // Keys are full var names (e.g. "--color-blush-500"), values are the CSS values.
  themeVars: Record<string, string>;
  // Google Fonts URL to inject as <link rel="stylesheet"> in <head>.
  googleFontsUrl?: string;
}

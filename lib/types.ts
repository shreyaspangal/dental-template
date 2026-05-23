export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  label: string;
  headline: string;
  description: string;
  treatments: string[];
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
}

export interface BusinessHour {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
}

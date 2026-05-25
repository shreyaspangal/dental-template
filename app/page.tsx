import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { Blog } from "@/components/sections/Blog";
import { FollowUs } from "@/components/sections/FollowUs";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { loadBrand } from "@/lib/brand";

const { content } = loadBrand();
const {
  LOGO, TERMS_URL,
  MARQUEE_ITEMS, NAV_LINKS, BOOKING_URL, HERO, ABOUT, METRICS,
  SERVICES_SECTION, SERVICES, PROCESS_SECTION, PROCESS_STEPS,
  TESTIMONIALS_SECTION, TESTIMONIALS, TEAM_SECTION, TEAM_MEMBERS,
  FAQ_SECTION, FAQ_ITEMS, BLOG_SECTION, BLOG_POSTS,
  INSTAGRAM_SECTION, INSTAGRAM_POSTS, CTA_SECTION,
  CONTACT_INFO, BUSINESS_HOURS, FOOTER_MENU, SOCIAL_LINKS, METADATA,
} = content;

export default function HomePage() {
  return (
    <>
      {/* ── Sticky top strip ──────────────────────────── */}
      <MarqueeTicker items={MARQUEE_ITEMS} />

      {/* ── Navigation ────────────────────────────────── */}
      <Navbar links={NAV_LINKS} bookingUrl={BOOKING_URL} logo={LOGO} />

      <main>
        {/* ── Hero ──────────────────────────────────────── */}
        <Hero data={HERO} bookingUrl={BOOKING_URL} />

        {/* ── About ─────────────────────────────────────── */}
        <About
          badge={ABOUT.badge}
          headline={ABOUT.headline}
          videoSrc={ABOUT.videoSrc}
          metrics={METRICS}
        />

        {/* ── Services ──────────────────────────────────── */}
        <Services
          badge={SERVICES_SECTION.badge}
          headline={SERVICES_SECTION.headline}
          services={SERVICES}
          bookingUrl={BOOKING_URL}
        />

        {/* ── Process ───────────────────────────────────── */}
        <Process
          badge={PROCESS_SECTION.badge}
          headline={PROCESS_SECTION.headline}
          steps={PROCESS_STEPS}
        />

        {/* ── Testimonials ──────────────────────────────── */}
        <Testimonials
          badge={TESTIMONIALS_SECTION.badge}
          headline={TESTIMONIALS_SECTION.headline}
          testimonials={TESTIMONIALS}
        />

        {/* ── Team ──────────────────────────────────────── */}
        <Team
          badge={TEAM_SECTION.badge}
          headline={TEAM_SECTION.headline}
          members={TEAM_MEMBERS}
        />

        {/* ── FAQ ───────────────────────────────────────── */}
        <FAQ
          badge={FAQ_SECTION.badge}
          headline={FAQ_SECTION.headline}
          image={FAQ_SECTION.image}
          imageAlt={FAQ_SECTION.imageAlt}
          items={FAQ_ITEMS}
        />

        {/* ── Blog ──────────────────────────────────────── */}
        <Blog
          badge={BLOG_SECTION.badge}
          headline={BLOG_SECTION.headline}
          posts={BLOG_POSTS}
          viewAllUrl={BLOG_SECTION.viewAllUrl}
        />

        {/* ── Follow Us ─────────────────────────────────── */}
        <FollowUs
          badge={INSTAGRAM_SECTION.badge}
          headline={INSTAGRAM_SECTION.headline}
          handle={INSTAGRAM_SECTION.handle}
          href={INSTAGRAM_SECTION.href}
          posts={INSTAGRAM_POSTS}
        />

        {/* ── Final CTA ─────────────────────────────────── */}
        <CTA
          headline={CTA_SECTION.headline}
          body={CTA_SECTION.body}
          imageLeft={CTA_SECTION.imageLeft}
          imageRight={CTA_SECTION.imageRight}
          imageLeftAlt={CTA_SECTION.imageLeftAlt}
          imageRightAlt={CTA_SECTION.imageRightAlt}
          bookingUrl={BOOKING_URL}
        />

      </main>

      {/* ── Footer (includes Contact) ─────────────────── */}
      <Footer
        info={CONTACT_INFO}
        hours={BUSINESS_HOURS}
        menuLinks={FOOTER_MENU}
        socialLinks={SOCIAL_LINKS}
        copyrightName={METADATA.copyrightName}
        termsUrl={TERMS_URL}
      />
    </>
  );
}

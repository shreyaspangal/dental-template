"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLenisRef } from "@/components/SmoothScroll";
import type { NavLink, BrandLogo } from "@/lib/types";

const NAVBAR_HEIGHT = 91; // h-22.75 = 22.75 * 4px

interface NavbarProps {
  links: NavLink[];
  bookingUrl: string;
  logo: BrandLogo;
}

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 34"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Main tooth body */}
      <path d="M8 2C5.5 2 3 4.5 3 8C3 14.5 5 24 7 29.5C8 32.5 9 34 10.5 34C11.5 34 12.5 32.5 13 30C13.5 28 14.5 28 15 30C15.5 32.5 16.5 34 17.5 34C19 34 20 32.5 21 29.5C23 24 25 14.5 25 8C25 4.5 22.5 2 20 2C18.5 2 17 3.5 14 3.5C11 3.5 9.5 2 8 2Z" />
      {/* Two white dots on top */}
      <circle cx="10.5" cy="7" r="1.4" className="fill-cream" />
      <circle cx="18.5" cy="7" r="1.4" className="fill-cream" />
    </svg>
  );
}

export function Navbar({ links, bookingUrl, logo }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const lenisRef = useLenisRef();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    lenisRef.current?.scrollTo(target as HTMLElement, { offset: -NAVBAR_HEIGHT });
  }, [lenisRef]);

  return (
    <header className="sticky top-0 z-50 border-b border-blush-100 bg-cream">
      <div className="container-base flex items-center justify-between h-22.75">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-charcoal-900">
          {logo.url ? (
            <Image
              src={logo.url}
              alt={logo.alt}
              height={40}
              width={160}
              style={{ width: "auto", height: "40px" }}
              className="object-contain"
              priority
            />
          ) : (
            <>
              <ToothIcon className="text-charcoal-900" />
              <span className="font-display font-bold text-base leading-tight">
                {logo.name.split(" ").map((word, i, arr) => (
                  <span key={i}>{word}{i < arr.length - 1 ? <br /> : null}</span>
                ))}
              </span>
            </>
          )}
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-base font-medium text-charcoal-400 hover:text-charcoal-900 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA — no hamburger */}
        <div className="hidden md:flex items-center">
          <Button href={bookingUrl} variant="secondary" size="md" external>
            Book A Call
          </Button>
        </div>

        {/* Mobile hamburger only */}
        <button
          className="flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-mint-100 text-charcoal-800 hover:bg-mint-200 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={16} /> : <AlignJustify size={16} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-blush-100 bg-cream px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-charcoal-700 hover:text-charcoal-900"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </Link>
          ))}
          <Button href={bookingUrl} variant="secondary" size="md" external className="mt-2">
            Book A Call
          </Button>
        </div>
      )}
    </header>
  );
}

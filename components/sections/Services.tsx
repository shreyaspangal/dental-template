"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations";
import type { ServiceItem } from "@/lib/types";

interface ServicesProps {
  badge: string;
  headline: string;
  services: ServiceItem[];
  bookingUrl: string;
}

function ServiceCard({
  service,
  index,
  bookingUrl,
}: {
  service: ServiceItem;
  index: number;
  bookingUrl: string;
}) {
  const isLeft = service.imagePosition === "left";

  return (
    <div className="sticky" style={{ top: "144px", zIndex: index + 1 }}>
      <FadeIn distance={80} amount={0.1}>
        <div
          className={`lg:h-[520px] bg-blush-100 rounded-[30px] p-2.5 gap-2.5 flex flex-col lg:flex-row ${
            isLeft ? "" : "lg:flex-row-reverse"
          }`}
        >
          {/* Image */}
          <div className="relative flex-1 rounded-[20px] overflow-hidden h-56 lg:h-auto lg:min-h-0">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          {/* Content panel */}
          <div className="bg-cream rounded-[20px] p-5 lg:p-7.5 flex flex-col gap-6 lg:gap-7.5 lg:justify-center lg:w-140">
            <div className="flex flex-col gap-2.5">
              <h3 className="font-normal text-charcoal-900" style={{ fontSize: 30 }}>
                {service.headline}
              </h3>
              <p className="text-base font-light text-charcoal-400 leading-relaxed">
                {service.description}
              </p>
            </div>

            <ul className="flex flex-col gap-2.5">
              {service.treatments.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-base font-light text-charcoal-900"
                >
                  <span className="animate-spin-medium text-base font-semibold text-charcoal-900 shrink-0">
                    ✳
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div>
              <Button href={bookingUrl} variant="secondary" size="md" external>
                Book A Call
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export function Services({ badge, headline, services, bookingUrl }: ServicesProps) {
  const lines = headline.split("\n");

  return (
    <section id="services">
      {/* Row 1 — 1-col centered: badge up first, headline up after */}
      <div className="flex flex-col items-center text-center gap-6 pt-16 pb-8 lg:pt-20 container-base">
        <FadeIn distance={80} amount={0.4}>
          <span className="inline-flex items-center gap-2 bg-blush-100 rounded-pill px-6 py-3 text-base font-light text-charcoal-900">
            <span className="animate-spin-medium text-base font-semibold">✳</span>
            {badge}
          </span>
        </FadeIn>
        <FadeIn distance={80} delay={0.2} amount={0.4}>
          <h2
            className="font-normal leading-[1.2] text-charcoal-900 text-[28px] md:text-[38px] lg:text-[48px] tracking-tight"
          >
            {lines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>
        </FadeIn>
      </div>

      {/* Service cards — each fades up as one unit when it enters the viewport */}
      <div className="flex flex-col gap-7.5 container-base">
        {services.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={i}
            bookingUrl={bookingUrl}
          />
        ))}
      </div>
    </section>
  );
}

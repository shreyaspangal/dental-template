"use client";

import Image from "next/image";
import { Shield, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeIn, TextSplit } from "@/components/animations";
import type { HERO as HeroData } from "@/lib/data";

type HeroConfig = typeof HeroData;

interface HeroProps {
  data: HeroConfig;
  bookingUrl: string;
}

export function Hero({ data, bookingUrl }: HeroProps) {
  const lines = data.headline.split("\n");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image — scales down from 1.5 on mount */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-charcoal-600/80 via-charcoal-600/90 to-transparent" />

      {/* Content */}
      <div className="container-base relative z-10 py-24">
        <div className="max-w-xl">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6">
            {lines.map((line, i) => (
              <TextSplit
                key={i}
                text={line}
                as="span"
                className="block whitespace-nowrap"
                delay={i * 0.28}
                staggerDelay={0.03}
                distance={18}
                damping={28}
                stiffness={130}
              />
            ))}
          </h1>

          <FadeIn as="p" delay={0.55} distance={16} className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-sm">
            {data.body}
          </FadeIn>

          <FadeIn delay={0.7} distance={16}>
            <Button href={bookingUrl} size="md" variant="secondary" external>
              Book A Call
            </Button>
          </FadeIn>
        </div>
      </div>

      {/* Trust card — absolute bottom-right */}
      <FadeIn
        direction="left"
        delay={0.6}
        distance={24}
        className="absolute w-[320px] p-7.5 rounded-[30px] bottom-12.5 right-12.5 z-10 hidden md:flex flex-col gap-7.5 backdrop-blur-lg bg-white/2 border border-white/10"
      >
        {/* Support row */}
        <div className="flex items-center gap-5">
          <span
            className="shrink-0 flex items-center justify-center backdrop-blur-2xl bg-white/5"
            style={{ width: 62, height: 62, borderRadius: "100px" }}
          >
            <Shield size={22} color="rgb(251,251,247)" />
          </span>
          <div className="flex flex-col gap-1.25">
            <p className="font-normal leading-none" style={{ fontSize: 30, color: "rgb(251,251,247)" }}>
              {data.trustCard.support.label}
            </p>
            <p className="font-light leading-snug" style={{ fontSize: 16, color: "rgb(251,251,247)" }}>
              {data.trustCard.support.value}
            </p>
          </div>
        </div>
        {/* Ratings row */}
        <div className="flex items-center gap-5">
          <span
            className="shrink-0 flex items-center justify-center backdrop-blur-2xl bg-white/5"
            style={{ width: 62, height: 62, borderRadius: "100px" }}
          >
            <Star size={22} color="rgb(251,251,247)" />
          </span>
          <div className="flex flex-col gap-1.25">
            <p className="font-normal leading-none" style={{ fontSize: 30, color: "rgb(251,251,247)" }}>
              {data.trustCard.ratings.label}
            </p>
            <p className="font-light leading-snug" style={{ fontSize: 16, color: "rgb(251,251,247)" }}>
              {data.trustCard.ratings.value}
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

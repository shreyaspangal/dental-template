"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations";
import type { FAQItem } from "@/lib/types";

interface FAQProps {
  badge: string;
  headline: string;
  image: string;
  imageAlt: string;
  items: FAQItem[];
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-cream rounded-[20px] overflow-hidden">
      <button
        className="flex w-full items-center justify-between gap-[10px] px-[30px] py-[30px] text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-charcoal-900 leading-snug">
          {item.question}
        </span>
        <span className="shrink-0 text-charcoal-900">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-[30px] pb-[30px]">
              <p className="text-base font-light text-charcoal-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ({ badge, headline, image, imageAlt, items }: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const lines = headline.split("\n");

  return (
    <section id="faq" className="py-30 overflow-x-clip">
      <div className="container-base">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-[30px]">
          {/* Left — sweeps in from the left */}
          <FadeIn direction="right" distance={80} amount={0.4} className="flex flex-col gap-[100px] lg:w-[432px] shrink-0">
            {/* Heading */}
            <div className="flex flex-col gap-[10px]">
              <span className="inline-flex w-fit items-center gap-2 bg-blush-100 rounded-pill px-6 py-3 text-base font-light text-charcoal-900">
                <span className="animate-spin-medium text-base font-semibold">✳</span>
                {badge}
              </span>
              <h2
                className="font-normal leading-[1.2] text-charcoal-900"
                style={{ fontSize: 48, letterSpacing: "-0.025em" }}
              >
                {lines.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
            </div>

            {/* Image */}
            <div
              className="relative rounded-[20px] overflow-hidden w-full"
              style={{ height: 250 }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 432px"
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Right — sweeps in from the right, 0.2s after left */}
          <FadeIn direction="left" distance={80} delay={0.2} amount={0.4} className="h-fit w-full max-w-[650px] bg-blush-100 rounded-[30px] p-[10px]">
            <div className="flex flex-col gap-[10px]">
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

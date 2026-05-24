"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const motionHeadings = {
  h1:   motion.h1,
  h2:   motion.h2,
  h3:   motion.h3,
  h4:   motion.h4,
  h5:   motion.h5,
  h6:   motion.h6,
  p:    motion.p,
  span: motion.span,
  div:  motion.div,
} as const;

type TextTag = keyof typeof motionHeadings;
type TextDirection = "up" | "down" | "none";

export interface TextSplitProps {
  text: string;
  className?: string;
  /** Per-character span className for fine-grained styling */
  charClassName?: string;
  /** Element to render as (default: "p") */
  as?: TextTag;
  /** Direction each character animates from (default: "up") */
  direction?: TextDirection;
  /** Slide distance in px per character (default: 20) */
  distance?: number;
  /** Starting opacity for each character (default: 0) */
  fromOpacity?: number;
  /** Global delay before the first character starts (seconds, default: 0) */
  delay?: number;
  /** Delay between each character in seconds (default: 0.025) */
  staggerDelay?: number;
  /** Spring damping (default: 25) */
  damping?: number;
  /** Spring stiffness (default: 120) */
  stiffness?: number;
  /** Only animate once (default: true) */
  once?: boolean;
  /** Fraction of element visible to trigger (default: 0.15) */
  amount?: number | "some" | "all";
}

/**
 * Splits text into individual characters and staggers their entrance animations
 * when the element enters the viewport. Spaces are preserved as non-animated gaps.
 *
 * @example
 * <TextSplit text="Bright Smiles" as="h1" className="text-5xl" />
 *
 * <TextSplit
 *   text="Expert Care"
 *   as="h2"
 *   staggerDelay={0.04}
 *   direction="up"
 *   delay={0.2}
 * />
 */
export function TextSplit({
  text,
  className,
  charClassName,
  as = "p",
  direction = "up",
  distance = 20,
  fromOpacity = 0,
  delay = 0,
  staggerDelay = 0.025,
  damping = 25,
  stiffness = 120,
  once = true,
  amount = 0.15,
}: TextSplitProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });

  const Container = motionHeadings[as] as typeof motion.p;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: {
      opacity: fromOpacity,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping,
        stiffness,
      },
    },
  };

  // Split into words to preserve natural word-wrapping; split each word into chars.
  const words = text.split(" ");

  return (
    <Container
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              variants={charVariants}
              className={`inline-block${charClassName ? ` ${charClassName}` : ""}`}
            >
              {char}
            </motion.span>
          ))}
          {/* Preserve space between words (not animated) */}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Container>
  );
}

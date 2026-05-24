"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface FadeOutProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Scroll progress at which fade-out begins (0–1, relative to element in viewport).
   * 0 = element's top hits viewport top. Default: 0.
   */
  exitStart?: number;
  /**
   * Scroll progress at which fade-out completes. Default: 0.6.
   */
  exitEnd?: number;
  /** Additional Y movement in px as element fades out. Default: 20. */
  distance?: number;
  /** "up" slides the element upward as it fades, "down" slides down. Default: "up". */
  direction?: "up" | "down" | "none";
  /** Apply spring smoothing to the scroll-linked motion. Default: true. */
  smooth?: boolean;
  /** Spring damping for smoothing (default: 30) */
  damping?: number;
  /** Spring stiffness for smoothing (default: 90) */
  stiffness?: number;
}

/**
 * Fades and slides an element out as it exits the top of the viewport on scroll.
 * Uses framer-motion's useScroll (scroll-linked, not triggered) — great for hero sections.
 *
 * @example
 * <FadeOut>
 *   <HeroHeadline />
 * </FadeOut>
 *
 * <FadeOut exitStart={0.1} exitEnd={0.7} distance={40}>
 *   <HeroImage />
 * </FadeOut>
 */
export function FadeOut({
  children,
  className,
  exitStart = 0,
  exitEnd = 0.6,
  distance = 20,
  direction = "up",
  smooth = true,
  damping = 30,
  stiffness = 90,
}: FadeOutProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 = element's top hits viewport top → 1 = element's bottom hits viewport top
    offset: ["start start", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [exitStart, exitEnd], [1, 0]);
  const rawY = useTransform(
    scrollYProgress,
    [exitStart, exitEnd],
    [0, direction === "up" ? -distance : direction === "down" ? distance : 0]
  );

  const springOpts = { damping, stiffness };
  const springOpacity = useSpring(rawOpacity, springOpts);
  const springY       = useSpring(rawY, springOpts);

  const opacity = smooth ? springOpacity : rawOpacity;
  const y       = smooth ? springY       : rawY;

  return (
    <motion.div ref={ref} className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

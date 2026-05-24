"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Parallax intensity as pixel distance over the element's full scroll journey.
   * Positive: element lags behind scroll (classic parallax — appears to float).
   * Negative: element moves faster than scroll.
   * Default: 60.
   */
  speed?: number;
  /** Scroll axis (default: "y") */
  direction?: "y" | "x";
  /**
   * Override the computed range with explicit [from, to] values in px.
   * Takes precedence over `speed`.
   */
  range?: [number, number];
  /** Apply spring smoothing for a more organic feel (default: true) */
  smooth?: boolean;
  /** Spring damping for smoothing (default: 20) */
  damping?: number;
  /** Spring stiffness for smoothing (default: 100) */
  stiffness?: number;
}

/**
 * Applies a scroll-linked parallax transform to its children.
 * Uses framer-motion's useScroll + useTransform, syncs with Lenis's native scroll.
 *
 * @example
 * // Image floats upward slightly as you scroll past
 * <Parallax speed={60}>
 *   <Image src="..." alt="..." fill />
 * </Parallax>
 *
 * // Horizontal parallax on a decorative element
 * <Parallax direction="x" speed={40} smooth={false}>
 *   <DecorativeBlob />
 * </Parallax>
 *
 * // Custom range: element moves from +30px to -80px over its scroll journey
 * <Parallax range={[30, -80]}>
 *   <Card />
 * </Parallax>
 */
export function Parallax({
  children,
  className,
  speed = 60,
  direction = "y",
  range,
  smooth = true,
  damping = 20,
  stiffness = 100,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Tracks progress from when element enters viewport bottom (0)
  // to when it exits viewport top (1).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const outputRange = range ?? [speed / 2, -(speed / 2)];

  const rawTransform = useTransform(scrollYProgress, [0, 1], outputRange);

  const springOpts = { damping, stiffness };
  const springTransform = useSpring(rawTransform, springOpts);
  const transform = smooth ? springTransform : rawTransform;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={direction === "y" ? { y: transform } : { x: transform }}
    >
      {children}
    </motion.div>
  );
}

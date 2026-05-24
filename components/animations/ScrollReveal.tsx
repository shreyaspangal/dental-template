"use client";

import { useRef } from "react";
import { motion, useInView, type Transition } from "framer-motion";

const motionElements = {
  div:     motion.div,
  span:    motion.span,
  section: motion.section,
  article: motion.article,
  p:       motion.p,
  h1:      motion.h1,
  h2:      motion.h2,
  h3:      motion.h3,
  h4:      motion.h4,
  h5:      motion.h5,
  h6:      motion.h6,
  li:      motion.li,
  ul:      motion.ul,
  header:  motion.header,
  footer:  motion.footer,
  main:    motion.main,
  aside:   motion.aside,
} as const;

export type RevealTag = keyof typeof motionElements;
export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** HTML element to render as (default: "div") */
  as?: RevealTag;
  /** Slide direction on entrance (default: "up") */
  direction?: RevealDirection;
  /** Slide distance in px (default: 20) */
  distance?: number;
  /** Starting opacity (default: 0) */
  fromOpacity?: number;
  /** Delay in seconds before animation starts (default: 0) */
  delay?: number;
  /** Spring damping — higher = less bounce (default: 25) */
  damping?: number;
  /** Spring stiffness — higher = faster (default: 120) */
  stiffness?: number;
  /** Spring mass (default: 1) */
  mass?: number;
  /** Override spring with a fixed duration in seconds */
  duration?: number;
  /** Custom ease curve when duration is set (default: expo out) */
  ease?: Transition["ease"];
  /** Only animate once, stays visible after (default: true) */
  once?: boolean;
  /** Fraction of element that must be visible to trigger (default: 0.15) */
  amount?: number | "some" | "all";
  /** Pass-through style to the root element */
  style?: React.CSSProperties;
}

function directionOffset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":    return { y: distance };
    case "down":  return { y: -distance };
    case "left":  return { x: distance };
    case "right": return { x: -distance };
    case "none":  return {};
  }
}

export function ScrollReveal({
  children,
  className,
  style,
  as = "div",
  direction = "up",
  distance = 20,
  fromOpacity = 0,
  delay = 0,
  damping = 25,
  stiffness = 120,
  mass = 1,
  duration,
  ease,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });

  const El = motionElements[as] as typeof motion.div;
  const offset = directionOffset(direction, distance);

  const transition: Transition =
    duration != null
      ? { duration, ease: (ease ?? [0.16, 1, 0.3, 1]) as Transition["ease"], delay }
      : { type: "spring", damping, stiffness, mass, delay };

  return (
    <El
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: fromOpacity, ...offset }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: fromOpacity, ...offset }
      }
      transition={transition}
    >
      {children}
    </El>
  );
}

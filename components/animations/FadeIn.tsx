"use client";

import { ScrollReveal, type ScrollRevealProps } from "./ScrollReveal";

export interface FadeInProps extends ScrollRevealProps {}

/**
 * Fades + slides an element into view when it enters the viewport.
 * A convenience wrapper around ScrollReveal with `direction="up"` as default.
 *
 * @example
 * <FadeIn delay={0.1}>
 *   <p>Hello</p>
 * </FadeIn>
 *
 * <FadeIn direction="left" distance={40} damping={20}>
 *   <Card />
 * </FadeIn>
 */
export function FadeIn({ direction = "up", ...props }: FadeInProps) {
  return <ScrollReveal direction={direction} {...props} />;
}

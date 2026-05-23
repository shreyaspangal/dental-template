import Image from "next/image";
import { Quote } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  badge: string;
  headline: string;
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-cream rounded-[20px] p-[30px] flex flex-col gap-[30px]">
      {/* Quote + text */}
      <div className="flex flex-col gap-[30px]">
        <Quote size={20} className="text-charcoal-900" />
        <p className="text-base font-light text-charcoal-400 leading-relaxed">
          {testimonial.quote}
        </p>
      </div>

      {/* Author info */}
      <div className="flex flex-col gap-[30px]">
        {/* Name + stars */}
        <div className="flex flex-col gap-[10px]">
          <p className="font-semibold text-base text-charcoal-900">
            {testimonial.name}
          </p>
          <StarRating rating={testimonial.rating} size={16} />
        </div>

        {/* Avatar */}
        <div
          className="relative rounded-[20px] overflow-hidden w-full"
          style={{ height: 250 }}
        >
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ badge, headline, testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-30">
      <div className="container-base flex flex-col gap-[50px]">
        {/* Heading */}
        <div className="flex flex-col items-center gap-[30px]">
          <span className="inline-flex items-center gap-2 bg-blush-100 rounded-pill px-6 py-3 text-base font-light text-charcoal-900">
            <span className="animate-spin-medium text-base font-semibold">✳</span>
            {badge}
          </span>
          <h2
            className="font-normal leading-[1.2] text-charcoal-900 text-center"
            style={{ fontSize: 48, letterSpacing: "-0.025em" }}
          >
            {headline}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="bg-blush-100 rounded-[30px] p-[10px] grid grid-cols-1 lg:grid-cols-3 gap-[10px]">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

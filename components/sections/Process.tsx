import Image from "next/image";
import { FadeIn } from "@/components/animations";
import type { ProcessStep } from "@/lib/types";

interface ProcessProps {
  badge: string;
  headline: string;
  steps: ProcessStep[];
}

function StepCard({ step }: { step: ProcessStep }) {
  return (
    <div className="bg-cream rounded-[20px] p-[30px] flex flex-col gap-[30px]">
      {/* Step tag */}
      <div>
        <span className="inline-flex items-center bg-blush-100 rounded-pill px-[18px] py-3 text-base font-light text-charcoal-900">
          Step {step.step}
        </span>
      </div>

      {/* Title + description */}
      <div className="flex flex-col gap-[10px]">
        <h3
          className="font-normal text-charcoal-900"
          style={{ fontSize: 30 }}
        >
          {step.title}
        </h3>
        <p className="text-base font-light text-charcoal-400 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Image */}
      <div
        className="relative rounded-[20px] overflow-hidden w-full"
        style={{ height: 297 }}
      >
        <Image
          src={step.image}
          alt={step.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function Process({ badge, headline, steps }: ProcessProps) {
  const lines = headline.split("\n");

  return (
    <section id="process" className="py-8 md:py-12 lg:py-16">
      <div className="container-base">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          {/* Left — sticky wrapper is plain div; FadeIn is the child so transform never touches the sticky element */}
          <div className="lg:sticky lg:top-96 lg:self-start lg:min-w-[430px]">
            <FadeIn direction="right" distance={80} amount={0.15} className="flex flex-col gap-[30px]">
              <span className="w-fit inline-flex items-center gap-2 bg-blush-100 rounded-pill px-6 py-3 text-base font-light text-charcoal-900">
                <span className="animate-spin-medium text-base font-semibold">✳</span>
                {badge}
              </span>
              <h2
                className="font-normal leading-[1.2] text-charcoal-900 text-[28px] md:text-[38px] lg:text-[48px] tracking-tight"
              >
                {lines.map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
            </FadeIn>
          </div>

          {/* Right — fades up (direction="up" avoids x-axis overflow inside a sticky section) */}
          <FadeIn distance={80} delay={0.2} amount={0.1} className="flex-1">
            <div className="bg-blush-100 rounded-[30px] p-[10px] flex flex-col gap-[10px]">
              {steps.map((step) => (
                <StepCard key={step.step} step={step} />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

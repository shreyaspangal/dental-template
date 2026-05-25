import { FadeIn } from "@/components/animations";
import type { MetricItem } from "@/lib/types";

interface AboutProps {
  badge: string;
  headline: string;
  videoSrc: string;
  metrics: MetricItem[];
}

function MetricCard({ metric }: { metric: MetricItem }) {
  return (
    <div className="rounded-2xl bg-cream p-7.5 flex flex-col justify-between flex-1">
      <div className="flex items-center justify-between">
        <p className="font-normal leading-none text-charcoal-900 text-[32px] md:text-[40px] lg:text-[48px] tracking-tight">
          {metric.value}
        </p>
        <span className="animate-spin-medium font-semibold text-2xl text-charcoal-900 shrink-0">✳</span>
      </div>
      <p className="text-base font-light text-charcoal-400 mt-4">
        {metric.description}
      </p>
    </div>
  );
}

export function About({ badge, headline, videoSrc, metrics }: AboutProps) {
  return (
    <section id="about" className="pt-8 md:pt-12 lg:pt-16 pb-0 overflow-x-clip">
      <div className="container-base">
        {/* Row 1 — 2-col: badge sweeps in from far left, headline from far right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12.5">
          <FadeIn direction="right" distance={80} amount={0.4} className="shrink-0">
            <span className="inline-flex w-fit items-center gap-2 bg-blush-100 rounded-pill px-6 py-3 text-base font-light text-charcoal-900">
              <span className="animate-spin-medium font-semibold text-lg text-charcoal-900">✳</span>
              {badge}
            </span>
          </FadeIn>
          <FadeIn direction="left" distance={80} delay={0.2} amount={0.4}>
            <h2
              className="font-normal leading-[1.2] text-charcoal-900 lg:max-w-200 text-[28px] md:text-[38px] lg:text-[48px] tracking-tight"
            >
              {headline}
            </h2>
          </FadeIn>
        </div>

        {/* Row 2 — fades up as one unit after row 1 */}
        <FadeIn delay={0.5} distance={80} amount={0.2} className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 rounded-lg overflow-hidden lg:h-150">
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:max-w-107.5 w-full p-2 rounded-lg flex flex-col gap-2 bg-blush-100">
            {metrics.map((metric) => (
              <MetricCard key={metric.value} metric={metric} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

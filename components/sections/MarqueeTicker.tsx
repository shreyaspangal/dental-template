"use client";

interface MarqueeTickerProps {
  items: string[];
  separator?: string;
  speed?: "slow" | "normal" | "fast";
}

const speedClass = {
  slow:   "animate-[marquee-scroll_48s_linear_infinite]",
  normal: "animate-marquee",
  fast:   "animate-[marquee-scroll_18s_linear_infinite]",
};

export function MarqueeTicker({
  items,
  separator = "✳",
  speed = "normal",
}: MarqueeTickerProps) {
  // Repeat until we have enough items to overflow any viewport, then double for the -50% loop trick
  const MIN_COPIES = 10;
  const reps = Math.ceil(MIN_COPIES / items.length);
  const half = Array.from({ length: reps }, () => items).flat();
  const doubled = [...half, ...half];

  return (
    <div
      className="w-full overflow-hidden py-2 select-none bg-blush-100"
      aria-hidden="true"
    >
      <div className={`flex min-w-max ${speedClass[speed]}`}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 px-5 text-base font-light whitespace-nowrap text-charcoal-900"
          >
            <span className="text-xl animate-spin-medium font-semibold text-charcoal-900">{separator}</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

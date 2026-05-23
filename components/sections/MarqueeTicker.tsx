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
  const doubled = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden py-2 select-none"
      style={{ backgroundColor: "#FFD7F2" }}
      aria-hidden="true"
    >
      <div className={`flex min-w-max ${speedClass[speed]}`}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 px-5 text-base font-light whitespace-nowrap"
            style={{ color: "rgb(38, 41, 47)" }}
          >
            <span className="text-xl animate-spin-medium font-semibold" style={{ color: "rgb(38, 41, 47)" }}>{separator}</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

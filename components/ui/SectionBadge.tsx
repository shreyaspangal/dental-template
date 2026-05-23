interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionBadge({ children, className = "" }: SectionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill bg-blush-100 border border-blush-200 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-charcoal-700 uppercase ${className}`}
    >
      <span className="text-blush-400">✳</span>
      {children}
    </span>
  );
}

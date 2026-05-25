import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-charcoal-900 text-cream hover:bg-charcoal-800 active:scale-[0.98]",
  secondary:
    "bg-blush-100 text-charcoal-800 border border-blush-200 hover:bg-blush-200 active:scale-[0.98]",
  ghost:
    "bg-transparent text-charcoal-800 hover:bg-blush-50 active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9    px-5   text-sm   gap-1.5",
  md: "py-4   px-7   text-base gap-2",
  lg: "py-5   px-9   text-base gap-2.5",
};

const base =
  "group relative inline-flex items-center justify-center rounded-pill font-light transition-all duration-200 cursor-pointer select-none whitespace-nowrap overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:pointer-events-none disabled:opacity-50";

function SlideText({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Invisible spacer — holds the button's intrinsic size */}
      <span className="invisible pointer-events-none select-none">{children}</span>
      {/* Visible text — absolute over full button, slides out on hover */}
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-full">
        {children}
      </span>
      {/* Ghost — sits one full button-height above, slides in on hover */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center -translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
      >
        {children}
      </span>
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <SlideText>{children}</SlideText>
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        <SlideText>{children}</SlideText>
      </button>
    );
  }
);

Button.displayName = "Button";

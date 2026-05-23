import { type ButtonHTMLAttributes, forwardRef } from "react";
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
    "bg-charcoal-900 text-white hover:bg-charcoal-800 active:scale-[0.98]",
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
  "inline-flex items-center justify-center rounded-pill font-light transition-all duration-200 cursor-pointer select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush-400 disabled:pointer-events-none disabled:opacity-50";

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
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

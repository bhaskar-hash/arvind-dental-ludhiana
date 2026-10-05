import { type HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-body font-medium",
  {
    variants: {
      variant: {
        gold: "bg-brand-gold/15 text-brand-gold border border-brand-gold/40",
        red: "bg-brand-red/10 text-brand-red border border-brand-red/30",
        dark: "bg-brand-black text-white",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

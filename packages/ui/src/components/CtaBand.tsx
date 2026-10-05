import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "../lib/cn";

export interface CtaBandProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: ReactNode;
  heading: ReactNode;
  subheading?: ReactNode;
  action?: ReactNode;
}

export const CtaBand = forwardRef<HTMLDivElement, CtaBandProps>(
  ({ className, eyebrow, heading, subheading, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-brand-band text-white px-6 py-16 sm:px-12 sm:py-20 text-center",
          className,
        )}
        {...props}
      >
        {eyebrow ? (
          <p className="font-body text-sm uppercase tracking-widest text-brand-gold mb-3">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-headline text-3xl sm:text-4xl font-bold max-w-2xl mx-auto">
          {heading}
        </h2>
        {subheading ? (
          <p className="font-body text-base sm:text-lg opacity-80 mt-4 max-w-xl mx-auto">
            {subheading}
          </p>
        ) : null}
        {action ? <div className="mt-8 flex justify-center">{action}</div> : null}
      </div>
    );
  },
);
CtaBand.displayName = "CtaBand";

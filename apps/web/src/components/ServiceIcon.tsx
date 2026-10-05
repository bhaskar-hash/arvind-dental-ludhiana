import type { SVGProps, ReactElement } from "react";

/**
 * Simple line-art dental icons, keyed by service slug. Stroke uses
 * currentColor so the badge wrapper controls the color.
 */

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const TOOTH_D =
  "M12 3.5c-2 0-2.8 1-4.4 1S5 3.8 4.4 5.3C3.6 7.2 4 9.5 4.8 12c.7 2.2.8 5.6 1.7 6.9.7 1 1.6.4 2-1 .4-1.6.6-3.6 1.5-3.6h.1c.9 0 1.1 2 1.5 3.6.4 1.4 1.3 2 2 1 .9-1.3 1-4.7 1.7-6.9.8-2.5 1.2-4.8.4-6.7C16.5 3.8 15 5.5 13.4 4.5c-.5-.6-.9-1-1.4-1Z";

const icons: Record<string, (p: SVGProps<SVGSVGElement>) => ReactElement> = {
  "dental-implants": (props) => (
    <svg {...base} {...props}>
      <path d="M8.2 4.2C7 3.5 6 3.4 5.4 4.6c-.7 1.6-.3 3.6.3 5.6" />
      <path d="M18.6 4.6C18 3.4 17 3.5 15.8 4.2" />
      <path d="M12 8v12" />
      <path d="M9.5 11h5" />
      <path d="M9.8 14h4.4" />
      <path d="M10.2 17h3.6" />
    </svg>
  ),
  "root-canal-treatment": (props) => (
    <svg {...base} {...props}>
      <path d={TOOTH_D} />
      <path d="M12 8v4" strokeWidth={1.2} />
      <path d="M10.6 12.8 12 11.4l1.4 1.4" strokeWidth={1.2} />
    </svg>
  ),
  veneers: (props) => (
    <svg {...base} {...props}>
      <path d="M7 4h7a3 3 0 0 1 3 3v3a7 7 0 0 1-7 7 6 6 0 0 1-6-6V6a2 2 0 0 1 2-2Z" />
      <path d="M9 7.5c1.5-.6 3.5-.6 5 0" strokeWidth={1.2} />
    </svg>
  ),
  crowns: (props) => (
    <svg {...base} {...props}>
      <path d="M4 9l3 3 5-6 5 6 3-3-1.5 9h-13L4 9Z" />
      <path d="M6.5 18h11" strokeWidth={1.2} />
    </svg>
  ),
  "laser-dentistry": (props) => (
    <svg {...base} {...props}>
      <path d={TOOTH_D} />
      <path d="M17.5 4l2.5-1M18.5 7h2.5M17.5 10l2.5 1" strokeWidth={1.2} />
    </svg>
  ),
  "teeth-whitening": (props) => (
    <svg {...base} {...props}>
      <path d={TOOTH_D} />
      <path d="M16.6 4.4l.6-1.4.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" strokeWidth={1.1} />
    </svg>
  ),
  "dentures-bridges": (props) => (
    <svg {...base} {...props}>
      <path d="M4 8c0-1 .8-1.5 2-1.5S8 8 8 8s.8-1.5 2-1.5S12 8 12 8s.8-1.5 2-1.5S16 8 16 8s.8-1.5 2-1.5S20 7 20 8v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8Z" />
      <path d="M4 11h16" strokeWidth={1.2} />
    </svg>
  ),
  "emergency-dental-care": (props) => (
    <svg {...base} {...props}>
      <path d="M12 21s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 3.5C19 16.6 12 21 12 21Z" />
      <path d="M12 9.5v4M10 11.5h4" strokeWidth={1.3} />
    </svg>
  ),
  "paediatric-dentistry": (props) => (
    <svg {...base} {...props}>
      <circle cx="12" cy="9" r="4.5" />
      <path d="M10 8.5h.01M14 8.5h.01" strokeWidth={1.6} />
      <path d="M10 11c.6.7 1.2 1 2 1s1.4-.3 2-1" strokeWidth={1.2} />
      <path d="M6 20c0-3 2.7-4.5 6-4.5S18 17 18 20" />
    </svg>
  ),
};

function ToothFallback(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d={TOOTH_D} />
    </svg>
  );
}

export function ServiceIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = icons[slug] ?? ToothFallback;
  return <Icon className={className} aria-hidden />;
}

export function ServiceBadge({ slug }: { slug: string }) {
  return (
    <span className="badge-pop inline-flex items-center justify-center w-[60px] h-[60px] rounded-full bg-brand-red text-white shadow-lg shadow-brand-red/30">
      <ServiceIcon slug={slug} className="w-7 h-7" />
    </span>
  );
}

/**
 * A small set of trust/benefit icons (not tied to a specific service slug),
 * used for "why choose us" style cards.
 */
const whyIcons: Record<string, (p: SVGProps<SVGSVGElement>) => ReactElement> = {
  award: (props) => (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.2 12 7 22l5-3 5 3-1.2-10" />
    </svg>
  ),
  shield: (props) => (
    <svg {...base} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  sparkles: (props) => (
    <svg {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path
        d="M12 8.5 13.2 11l2.5 1-2.5 1L12 15.5 10.8 13l-2.5-1 2.5-1z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  heart: (props) => (
    <svg {...base} {...props}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  ),
  clock: (props) => (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

export function WhyIcon({
  name,
  className,
}: {
  name: keyof typeof whyIcons;
  className?: string;
}) {
  const Icon = whyIcons[name] ?? whyIcons.award;
  return <Icon className={className} aria-hidden />;
}

export function WhyBadge({ name }: { name: keyof typeof whyIcons }) {
  return (
    <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-[13px] bg-brand-red/10 text-brand-red">
      <WhyIcon name={name} className="w-6 h-6" />
    </span>
  );
}

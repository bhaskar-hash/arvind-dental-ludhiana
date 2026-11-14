import Image from "next/image";
import { clinicPhoto } from "@/lib/doctor";

/**
 * The real photo of the clinic building. Next.js resizes it for each screen
 * (phones get a small WebP/AVIF instead of the 1447px original), which keeps
 * the first paint fast on mobile data.
 */
export function ClinicPhoto({ className, sizes, priority }: { className: string; sizes: string; priority?: boolean }) {
  return (
    <Image
      src={clinicPhoto.fallback}
      width={clinicPhoto.width}
      height={clinicPhoto.height}
      alt={clinicPhoto.alt}
      sizes={sizes}
      priority={priority}
      quality={78}
      className={className}
    />
  );
}

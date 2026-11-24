import Image from "next/image";
import { ServiceIcon } from "@/components/ServiceIcon";
import { articleCover, type FoundImage } from "@/lib/illustrations";

/**
 * Renders an AI illustration found by lib/illustrations.ts. Next.js resizes it
 * to the `sizes` given, so small tiles don't download the 1200px original.
 */
export function AiImage({
  image,
  className,
  wrapperClassName = "",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  image: FoundImage;
  className: string;
  wrapperClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  // NMC guidelines 7.2: AI-generated images must say so where they are shown.
  return (
    <span className={`relative block ${wrapperClassName}`}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        sizes={sizes}
        priority={priority}
        quality={85}
        className={className}
      />
      <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-0.5 font-body text-[10px] font-semibold text-white shadow-sm">
        AI illustration
      </span>
    </span>
  );
}

/** An article's cover: its AI illustration once saved, otherwise the treatment icon. */
export function ArticleCover({ slug, service, iconClass }: { slug: string; service?: string; iconClass: string }) {
  const cover = articleCover(slug);
  if (cover) {
    const isSquare = Math.abs(cover.width - cover.height) < 50;
    return (
      <span className="relative block aspect-[16/9] w-full overflow-hidden bg-brand-warm/40">
        <AiImage
          image={cover}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          wrapperClassName="h-full w-full"
          className={
            isSquare
              ? "block h-full w-full object-contain p-2"
              : "block aspect-[16/9] w-full object-cover"
          }
        />
      </span>
    );
  }
  return (
    <span className="flex h-[150px] items-center justify-center bg-brand-blush text-brand-red">
      <ServiceIcon slug={service ?? ""} className={iconClass} />
    </span>
  );
}

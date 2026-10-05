import { ServiceIcon } from "@/components/ServiceIcon";
import { articleCover, type FoundImage } from "@/lib/illustrations";

/** Renders an AI illustration found by lib/illustrations.ts. */
export function AiImage({ image, className, priority }: { image: FoundImage; className: string; priority?: boolean }) {
  return (
    <picture>
      {image.webp ? <source srcSet={image.webp} type="image/webp" /> : null}
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}

/** An article's cover: its AI illustration once saved, otherwise the treatment icon. */
export function ArticleCover({ slug, service, iconClass }: { slug: string; service?: string; iconClass: string }) {
  const cover = articleCover(slug);
  if (cover) return <AiImage image={cover} className="block aspect-[16/9] w-full object-cover" />;
  return (
    <span className="flex h-[150px] items-center justify-center bg-brand-blush text-brand-red">
      <ServiceIcon slug={service ?? ""} className={iconClass} />
    </span>
  );
}

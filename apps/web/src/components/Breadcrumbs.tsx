import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";

export function Breadcrumbs({
  items,
  width = "max-w-3xl",
}: {
  items: BreadcrumbItem[];
  /** Tailwind max-width class matching the page's content column. */
  width?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={`px-6 pt-6 ${width} mx-auto w-full`}>
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <ol className="flex flex-wrap items-center gap-1.5 font-body text-xs opacity-60">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <Link href={item.path} className="hover:text-brand-red underline-offset-2 hover:underline">
                    {item.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

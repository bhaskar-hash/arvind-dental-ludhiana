import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AiImage } from "@/components/AiImage";
import { PhotoReviewCta } from "@/components/Sections";
import { articleCover } from "@/lib/illustrations";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ARTICLES_UPDATED, blogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getServiceBySlug } from "@/lib/services";
import { buildBlogPostSchemaGraph } from "@/lib/schema";
import { business } from "@/lib/business";
import { routineFees } from "@/lib/pricing";
import { doctor } from "@/lib/doctor";
import { ogImagesFor } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `${business.siteUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${business.siteUrl}/blog/${post.slug}`,
      type: "article",
      images: ogImagesFor(),
    },
  };
}

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-brand-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderFormattedBody(body: string) {
  const blocks = body.split("\n\n").map((b) => b.trim()).filter(Boolean);

  return (
    <div className="mt-3 flex flex-col gap-4 font-body text-[17px] leading-relaxed text-brand-muted">
      {blocks.map((block, idx) => {
        if (
          block.startsWith("**Direct Answer:**") ||
          block.startsWith("**Crisp Answer:**") ||
          block.startsWith("**Quick Answer:**") ||
          block.startsWith("**Key Takeaway:**") ||
          block.startsWith("**At a Glance:**")
        ) {
          return (
            <div
              key={idx}
              className="rounded-2xl border border-brand-red/20 bg-brand-warm/60 p-4 sm:p-5 text-brand-ink"
            >
              <p className="font-medium text-brand-ink leading-relaxed">
                {formatInline(block)}
              </p>
            </div>
          );
        }

        if (
          block.includes("\n• ") ||
          block.startsWith("• ") ||
          block.includes("\n- ") ||
          block.startsWith("- ")
        ) {
          const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
          const hasIntro = !lines[0].startsWith("• ") && !lines[0].startsWith("- ");
          const intro = hasIntro ? lines[0] : null;
          const items = (hasIntro ? lines.slice(1) : lines).map((l) =>
            l.replace(/^[•\-]\s*/, "")
          );

          return (
            <div key={idx} className="space-y-2">
              {intro ? <p>{formatInline(intro)}</p> : null}
              <ul className="list-disc pl-5 space-y-1.5 marker:text-brand-red">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {formatInline(item)}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (/^\d+\.\s/.test(block)) {
          const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
          const hasIntro = !/^\d+\.\s/.test(lines[0]);
          const intro = hasIntro ? lines[0] : null;
          const items = (hasIntro ? lines.slice(1) : lines).map((l) =>
            l.replace(/^\d+\.\s*/, "")
          );

          return (
            <div key={idx} className="space-y-2">
              {intro ? <p>{formatInline(intro)}</p> : null}
              <ol className="list-decimal pl-5 space-y-2 marker:font-semibold marker:text-brand-ink">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {formatInline(item)}
                  </li>
                ))}
              </ol>
            </div>
          );
        }

        return <p key={idx}>{formatInline(block)}</p>;
      })}
    </div>
  );
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedService = post.relatedService
    ? getServiceBySlug(post.relatedService)
    : undefined;
  const cover = articleCover(post.slug);

  return (
    <main>
      <JsonLd data={buildBlogPostSchemaGraph(post)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <article className="px-6 py-16 sm:py-20 max-w-2xl mx-auto">
        {cover ? (
          <AiImage image={cover} priority className="mb-10 block aspect-[16/9] w-full rounded-3xl object-cover" />
        ) : null}
        <h1 className="font-headline text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-[-0.01em]">
          {post.title}
        </h1>
        <p className="font-body text-sm text-brand-muted mt-4">
          By {doctor.name}, {doctor.credentials}{doctor.registration ? ` · ${doctor.registration}` : ""} • {business.addressLocality}, Punjab
        </p>

        <div className="mt-8 flex flex-col gap-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-headline text-2xl font-bold">
                {section.heading}
              </h2>
              {renderFormattedBody(section.body)}
            </section>
          ))}
        </div>

        <aside className="mt-12 rounded-2xl border border-brand-line bg-brand-warm/30 p-6 sm:p-7" aria-label="About this article">
          <p className="font-headline text-lg font-bold text-brand-ink">About this article</p>
          <p className="mt-2 font-body text-[15px] leading-relaxed text-brand-muted">
            Written for patients, as general information. It is not a diagnosis or a treatment plan, and your own
            dentist will advise on your teeth after an examination. Author: {doctor.name}, {doctor.credentials}
            {doctor.registration ? ` · ${doctor.registration}` : ""}. Last updated{" "}
            <time dateTime={ARTICLES_UPDATED}>{new Date(ARTICLES_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>.
          </p>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-brand-muted">
            {business.name}, {business.streetAddress}, {business.addressLocality}. Check-up fee ₹{routineFees.checkup}.{" "}
            <Link href="/location" className="font-semibold text-brand-red underline underline-offset-2">
              Address and directions
            </Link>
          </p>
        </aside>

        {relatedService ? (
          <p className="font-body text-base mt-6 rounded-2xl bg-brand-warm px-6 py-5">
            Related:{" "}
            <Link
              href={`/services/${relatedService.slug}`}
              className="font-semibold text-brand-red underline underline-offset-2"
            >
              {relatedService.name}
            </Link>
          </p>
        ) : null}
      </article>

      <PhotoReviewCta heading="Have a question about your own smile? Send us 3 photos." />
    </main>
  );
}

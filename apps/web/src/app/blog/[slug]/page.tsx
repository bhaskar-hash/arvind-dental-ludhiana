import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AiImage } from "@/components/AiImage";
import { PhotoReviewCta } from "@/components/Sections";
import { articleCover } from "@/lib/illustrations";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getServiceBySlug } from "@/lib/services";
import { buildBlogPostSchemaGraph } from "@/lib/schema";
import { business } from "@/lib/business";
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
      images: ogImagesFor(articleCover(post.slug)),
    },
  };
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
          By {business.doctorName}, {business.doctorCredentials}
        </p>

        <div className="mt-8 flex flex-col gap-8">
          {post.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-headline text-2xl font-bold">
                {section.heading}
              </h2>
              <p className="font-body text-[17px] leading-relaxed text-brand-muted mt-3">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {relatedService ? (
          <p className="font-body text-base mt-12 rounded-2xl bg-brand-warm px-6 py-5">
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

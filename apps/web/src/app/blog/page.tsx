import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ArticleCover } from "@/components/AiImage";
import { blogPosts } from "@/lib/blog";
import { business } from "@/lib/business";
import { container, eyebrow } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Dental Health Articles",
  description: `Dental health articles from ${business.name} in ${business.addressLocality} — implants, root canals, veneers, crowns, and laser dentistry explained plainly.`,
  alternates: { canonical: `${business.siteUrl}/blog` },
};

export default function BlogIndexPage() {
  return (
    <main>
      <section className="bg-brand-warm pb-16 pt-20">
        <div className={container}>
          <p className={`hero-in hero-in-1 ${eyebrow}`}>Articles</p>
          <h1 className="hero-in hero-in-2 max-w-3xl font-headline text-[clamp(2.3rem,4.6vw,3.5rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
            Plain-English guides from Dr. Sahu
          </h1>
          <p className="hero-in hero-in-3 mt-5 max-w-2xl font-body text-lg text-brand-muted">
            Straight answers about treatments, costs and caring for your teeth, from{" "}
            {business.name} in {business.addressLocality}.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className={`${container} grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3`}>
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i % 3} className="h-full">
              <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-brand-line bg-white text-brand-ink hover-lift">
                <ArticleCover slug={post.slug} service={post.relatedService} iconClass="h-12 w-12" />
                <span className="flex flex-col gap-2 px-[26px] pb-7 pt-6">
                  <span className="font-headline text-xl font-bold leading-snug">{post.title}</span>
                  <span className="font-body text-[15px] text-brand-muted">{post.metaDescription}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

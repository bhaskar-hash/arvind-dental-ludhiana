/**
 * Shown on pages whose prices or terms are still awaiting Dr. Sahu's
 * approval. Pages that render it are also noindexed and kept out of the
 * sitemap and navigation.
 */
export function DraftBanner({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      className="bg-[#FFF4D6] border-b border-[#E9CF7A] text-[#4A3A06] px-6 py-3"
    >
      <p className="max-w-5xl mx-auto font-body text-sm">
        <strong className="font-semibold">Draft for Dr. Sahu&apos;s review.</strong>{" "}
        {children}
      </p>
    </div>
  );
}

import type { ServiceFaq } from "@/lib/services";

export function FaqAccordion({ faqs, openFirst = true }: { faqs: ServiceFaq[]; openFirst?: boolean }) {
  return (
    <div className="border-t border-brand-line">
      {faqs.map((faq, i) => (
        <details key={faq.question} open={openFirst && i === 0} className="group border-b border-brand-line">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-5 font-body text-lg font-semibold text-brand-ink [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blush text-xl leading-none text-brand-red transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 font-body text-[17px] text-brand-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

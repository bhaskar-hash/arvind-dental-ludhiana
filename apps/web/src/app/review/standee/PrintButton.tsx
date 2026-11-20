"use client";

import { Icon } from "@/components/Icon";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 font-body text-xs font-bold text-white shadow-sm hover:bg-brand-red-dark transition-all"
    >
      <Icon name="receipt" size={15} />
      <span>Print Standee Card</span>
    </button>
  );
}

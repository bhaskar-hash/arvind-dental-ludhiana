/**
 * Where a visitor came from, kept for the visit only (sessionStorage in their
 * own browser). The booking and call-back forms add it to the WhatsApp message
 * the patient sends, so the clinic can see which pages and sources bring
 * enquiries without any tracking service.
 */
const KEY = "rc_source";

type Source = { source: string; medium: string; campaign?: string };

/** Records the first source of a visit: UTM tags, else the referrer, else "direct". */
export function captureSource() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    let value: Source;
    if (q.get("utm_source")) {
      value = {
        source: q.get("utm_source") as string,
        medium: q.get("utm_medium") ?? "unknown",
        campaign: q.get("utm_campaign") ?? undefined,
      };
    } else if (document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host === window.location.hostname.replace(/^www\./, "")) return;
      const isSearch = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia)\./.test(host);
      value = { source: host, medium: isSearch ? "organic" : "referral" };
    } else {
      value = { source: "direct", medium: "none" };
    }
    sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* private mode or blocked storage: attribution is optional */
  }
}

/** "Source: google / organic", or null when nothing was recorded. */
export function sourceLine(): string | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Source;
    return `Source: ${s.source} / ${s.medium}${s.campaign ? ` / ${s.campaign}` : ""}`;
  } catch {
    return null;
  }
}

/**
 * Where a visitor came from, kept for the visit only (sessionStorage in their
 * own browser). The booking and call-back forms add it to the WhatsApp message
 * the patient sends, so the clinic can see which pages and sources bring
 * enquiries without any tracking service.
 *
 * Each visit also gets a short reference such as "RC-G-4821" (G = Google Ads,
 * M = Meta ads, S = search, R = other website, D = direct). The clinic copies it
 * from the WhatsApp message into the ads tracker sheet, which is how ad spend is
 * matched to visits and treatment.
 */
const KEY = "rc_source";

type Channel = "G" | "M" | "S" | "R" | "D";
type Source = { source: string; medium: string; campaign?: string; channel: Channel; ref: string };

function channelOf(q: URLSearchParams, source: string, medium: string): Channel {
  const paid = /^(cpc|ppc|paid|paid_social|paidsocial|ads?)$/i.test(medium);
  if (q.get("gclid") || q.get("gbraid") || q.get("wbraid") || (paid && /google/i.test(source))) return "G";
  if (q.get("fbclid") && paid) return "M";
  if (paid && /(facebook|instagram|meta|fb|ig)/i.test(source)) return "M";
  if (medium === "organic") return "S";
  if (source === "direct") return "D";
  return "R";
}

/**
 * Records the source of a visit: UTM tags or ad click ids, else the referrer,
 * else "direct". The first source is kept, except that arriving from a tagged
 * link (an ad, a campaign) replaces it, so ad clicks are always credited.
 */
export function captureSource() {
  try {
    const q = new URLSearchParams(window.location.search);
    const tagged = ["utm_source", "gclid", "gbraid", "wbraid", "fbclid"].some((k) => q.get(k));
    if (sessionStorage.getItem(KEY) && !tagged) return;
    let source: string;
    let medium: string;
    let campaign: string | undefined;
    if (q.get("utm_source")) {
      source = q.get("utm_source") as string;
      medium = q.get("utm_medium") ?? "unknown";
      campaign = q.get("utm_campaign") ?? undefined;
    } else if (q.get("gclid") || q.get("gbraid") || q.get("wbraid")) {
      source = "google";
      medium = "cpc";
    } else if (document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host === window.location.hostname.replace(/^www\./, "")) return;
      const isSearch = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia)\./.test(host);
      source = host;
      medium = isSearch ? "organic" : "referral";
    } else {
      source = "direct";
      medium = "none";
    }
    const channel = channelOf(q, source, medium);
    const ref = `RC-${channel}-${Math.floor(1000 + Math.random() * 9000)}`;
    const value: Source = { source, medium, campaign, channel, ref };
    sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* private mode or blocked storage: attribution is optional */
  }
}

function read(): Source | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Source) : null;
  } catch {
    return null;
  }
}

/** "Source: google / cpc / implants-nov · Ref: RC-G-4821", or null when nothing was recorded. */
export function sourceLine(): string | null {
  const s = read();
  if (!s) return null;
  const ref = s.ref ? ` · Ref: ${s.ref}` : "";
  return `Source: ${s.source} / ${s.medium}${s.campaign ? ` / ${s.campaign}` : ""}${ref}`;
}

/** The visit's reference, for WhatsApp links that are not forms. */
export function visitRef(): string | null {
  return read()?.ref ?? null;
}

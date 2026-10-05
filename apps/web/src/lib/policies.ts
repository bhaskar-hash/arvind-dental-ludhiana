/**
 * Patient policies shown on /policies — binding promises to patients.
 * Approved by Dr. Sahu on 2026-10-06. Setting `policiesApproved` to false
 * puts the page back into draft (banner, noindex, out of sitemap and nav).
 */

export const policiesApproved = true;

export const policiesLastUpdated = "October 2026";

/**
 * Warranty periods by implant option. Which option a patient gets is agreed
 * with Dr. Sahu and written on their treatment plan.
 */
export const implantWarranties = [
  { id: "5-year", label: "5-year warranty", period: "5 years from the day your implant is placed" },
  { id: "10-year", label: "10-year warranty", period: "10 years from the day your implant is placed" },
  { id: "lifetime", label: "Lifetime warranty", period: "For as long as you have the implant" },
] as const;

/** How often a check-up is needed to keep an implant warranty valid. */
export const warrantyCheckupMonths = 6;

/** Notice needed to reschedule without charge. */
export const rescheduleNoticeHours = 24;

/** Working days for a refund to reach the original payment method. */
export const refundWorkingDays = 7;

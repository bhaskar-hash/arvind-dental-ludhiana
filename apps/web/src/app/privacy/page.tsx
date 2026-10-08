import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { business } from "@/lib/business";
import { doctor } from "@/lib/doctor";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.name} collects, uses and protects your personal and health information, and your rights under India's Digital Personal Data Protection Act, 2023.`,
  alternates: { canonical: `${business.siteUrl}/privacy` },
};

const LAST_UPDATED = "9 October 2026";

const SECTIONS = [
  { id: "who", label: "Who we are" },
  { id: "collect", label: "What we collect" },
  { id: "use", label: "How we use it" },
  { id: "share", label: "Who we share it with" },
  { id: "keep", label: "How long we keep it" },
  { id: "rights", label: "Your rights" },
  { id: "contact", label: "Contact & complaints" },
];

const H2 = "font-headline text-2xl font-bold scroll-mt-24";
const P = "font-body text-[17px] text-brand-muted mt-3 leading-relaxed";
const UL = "mt-3 flex list-disc flex-col gap-2 pl-6 font-body text-[17px] text-brand-muted leading-relaxed";

export default function PrivacyPage() {
  const tel = `tel:${business.telephone}`;
  return (
    <main>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy policy", path: "/privacy" },
        ]}
      />

      <header className="mx-auto max-w-3xl px-6 pb-8 pt-10">
        <p className="mb-3 font-body text-[13px] font-bold uppercase tracking-[0.14em] text-brand-red">Privacy policy</p>
        <h1 className="font-headline text-[clamp(2.2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          Your information, and how we look after it
        </h1>
        <p className="mt-5 font-body text-lg text-brand-muted">
          We collect only what we need to answer you and care for your teeth. We never sell your
          information, and you can ask to see, correct or delete it at any time.
        </p>
        <p className="mt-3 font-body text-sm text-brand-muted">Last updated {LAST_UPDATED}</p>
        <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="inline-flex min-h-[40px] items-center rounded-full border border-brand-line px-4 font-body text-sm font-semibold hover:border-brand-red hover:text-brand-red">
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 pb-20">
        <section id="who" className="scroll-mt-24">
          <h2 className={H2}>Who we are</h2>
          <p className={P}>
            {business.name}, led by {doctor.name}, {doctor.credentials}, at {business.streetAddress},{" "}
            {business.addressLocality}, {business.addressRegion} {business.postalCode}. Under India&apos;s
            Digital Personal Data Protection Act, 2023 (DPDP Act), we are the &ldquo;data
            fiduciary&rdquo; for the personal information you give us. That means we decide how it is
            used and are responsible for protecting it.
          </p>
        </section>

        <section id="collect" className="scroll-mt-24">
          <h2 className={H2}>What we collect</h2>
          <ul className={UL}>
            <li>
              <strong className="text-brand-ink">Contact details</strong>: your name and mobile number,
              when you call us, message us on WhatsApp or use a form on this website.
            </li>
            <li>
              <strong className="text-brand-ink">What you tell us about your teeth</strong>: your
              concern, and any photos of your teeth you choose to send for Dr. Sahu to review.
            </li>
            <li>
              <strong className="text-brand-ink">Clinic records</strong>: your medical and dental
              history, examination findings, X-rays, clinical photos, treatment plans and payment
              records, when you visit.
            </li>
            <li>
              <strong className="text-brand-ink">Family members</strong>: details of anyone you add to
              a family membership. For children under 18 we collect information only with a
              parent&apos;s or guardian&apos;s consent.
            </li>
          </ul>
          <h3 className="mt-6 font-headline text-lg font-bold">On this website</h3>
          <ul className={UL}>
            <li>
              Our booking and call-back forms <strong className="text-brand-ink">don&apos;t store
              anything on this website</strong>. They open WhatsApp with your message ready, and
              you choose whether to send it.
            </li>
            <li>
              We don&apos;t use advertising cookies or tracking. If we add visitor statistics, we
              will update this page first.
            </li>
            <li>
              The map on our Visit Us page is provided by Google, and videos may be hosted on
              YouTube. Those services may set their own cookies under Google&apos;s privacy policy.
            </li>
            <li>
              Our website host keeps short-term technical logs, such as IP addresses, to keep the
              site secure and working.
            </li>
          </ul>
        </section>

        <section id="use" className="scroll-mt-24">
          <h2 className={H2}>How we use it</h2>
          <ul className={UL}>
            <li>To reply to you, book and confirm appointments, and call you back when you ask us to.</li>
            <li>To diagnose, plan and carry out your treatment, and keep your clinical records.</li>
            <li>To give you estimates, bills, receipts and copies of your records when you ask for them.</li>
            <li>To send check-up and membership reminders, only if you have agreed to receive them.</li>
            <li>To meet our legal and professional duties as a dental clinic.</li>
          </ul>
          <p className={P}>
            We rely on your consent, which you can withdraw at any time, and on the specific uses
            the DPDP Act allows without consent, such as responding to a medical emergency or
            meeting a legal obligation.
          </p>
          <h3 className="mt-6 font-headline text-lg font-bold">Photos on this website</h3>
          <p className={P}>
            Before-and-after photos appear on this website only with the patient&apos;s
            permission. We show the inside of the mouth only, never faces or names. A patient can
            withdraw permission at any time, and we will remove their photos from this website
            within 30 days.
          </p>
        </section>

        <section id="share" className="scroll-mt-24">
          <h2 className={H2}>Who we share it with</h2>
          <p className={P}>We never sell your information. We share it only when needed:</p>
          <ul className={UL}>
            <li>With the dental laboratory making your crown, bridge, denture or implant parts: only the case details they need.</li>
            <li>With services we use to talk to you and run the clinic, such as WhatsApp (Meta) for messages, and our payment provider when you pay.</li>
            <li>When the law requires it, for example a court order or a request from a government authority.</li>
          </ul>
        </section>

        <section id="keep" className="scroll-mt-24">
          <h2 className={H2}>How long we keep it, and how we protect it</h2>
          <ul className={UL}>
            <li>Clinical records are kept for as long as medical record-keeping rules and the law require.</li>
            <li>Enquiries that don&apos;t lead to a visit are deleted within 12 months.</li>
            <li>Only the clinic team can see patient information. Patient photos are kept out of personal phone galleries and backups.</li>
          </ul>
        </section>

        <section id="rights" className="scroll-mt-24">
          <h2 className={H2}>Your rights</h2>
          <p className={P}>Under the DPDP Act, you can ask us to:</p>
          <ul className={UL}>
            <li>Tell you what personal information we hold about you and how we use it.</li>
            <li>Correct, complete or update it.</li>
            <li>Delete it, unless the law requires us to keep it, as it does for clinical records.</li>
            <li>Stop using it for something you had agreed to, such as reminders or website photos. Withdrawing consent is as easy as giving it.</li>
            <li>Act through someone you nominate, if you are unable to yourself.</li>
          </ul>
          <p className={P}>Contact us using the details below to use any of these rights. We will reply within 30 days.</p>
        </section>

        <section id="contact" className="scroll-mt-24 rounded-3xl bg-brand-warm p-7 sm:p-8">
          <h2 className={H2}>Contact &amp; complaints</h2>
          <p className={P}>
            For any privacy question, request or complaint, contact our grievance officer,{" "}
            {doctor.name}:
          </p>
          <ul className="mt-4 flex flex-col gap-2 font-body text-[17px]">
            <li>
              Phone or WhatsApp:{" "}
              <a href={tel} className="font-semibold text-brand-red">
                {business.telephoneDisplay}
              </a>
            </li>
            <li>
              By post or in person: {business.name}, {business.streetAddress}, {business.addressLocality},{" "}
              {business.addressRegion} {business.postalCode}
            </li>
          </ul>
          <p className={P}>
            If you are not satisfied with our response, you can complain to the Data Protection
            Board of India.
          </p>
          <p className="mt-6 font-body text-sm text-brand-muted">
            We may update this policy. The date at the top shows the latest version. See also our{" "}
            <Link href="/policies" className="font-semibold text-brand-red">
              patient policies
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { CampForm } from "@/components/RequestForms";
import { Reveal } from "@/components/Reveal";
import { business, whatsappLink } from "@/lib/business";
import { doctor } from "@/lib/doctor";
import { pricingApproved } from "@/lib/pricing";
import { buildFaqSchema } from "@/lib/schema";
import { btn, container, eyebrow, h2, lead } from "@/lib/styles";

export const metadata: Metadata = {
  title: `Dental Camps for Companies, Schools & Colleges in ${business.addressLocality}`,
  description: `Dental check-up camps at your workplace, school or college in ${business.addressLocality}, run by ${business.name}. Private check-ups, a written note for everyone, and no pressure to book.`,
  alternates: { canonical: `${business.siteUrl}/dental-camps` },
};

const campWhatsapp = whatsappLink("Hi, I'd like to plan a dental camp with RedCity Dental Care.");

const INCLUDED = [
  "A short, private check-up for each person",
  "A talk on caring for teeth and gums, with a brushing demonstration",
  "A written note for everyone: what we found and what, if anything, needs doing",
  "A summary for the organiser, with numbers only and no names",
];

const AUDIENCES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "briefcase",
    title: "Companies & offices",
    body: "Check-ups for your team at the workplace, one person at a time in a quiet room, so nobody has to take time off for a first visit.",
  },
  {
    icon: "cap",
    title: "Schools",
    body: "Check-ups for children and a brushing lesson for each class. We see a child only with a parent's written consent, and the note goes home to the parents.",
  },
  {
    icon: "users",
    title: "Colleges & universities",
    body: "Check-ups for students and staff, with a short talk on gum health, wisdom teeth and what to do in a dental emergency.",
  },
];

const STEPS = [
  { title: "Tell us about your group", body: "How many people, where, and the dates that suit you. We reply with a plan and a quote." },
  { title: "We plan it together", body: "We agree the day, the timings and the room. For schools, we send a consent form for parents to sign first." },
  { title: "Check-ups on the day", body: "Each person has a short, private check-up and can ask anything they like." },
  { title: "A note for everyone", body: "Everyone leaves with a written note of what we found. Nobody is asked to book there and then." },
  { title: "A summary for you", body: "You get a summary with numbers only, never names or anyone's results." },
];

const NEEDS = [
  "A room or corner with good light and some privacy",
  "A table, two chairs and a power point",
  "Someone from your side to help people find us on the day",
  "For schools: signed consent forms from parents",
];

const CAMP_FAQS = [
  {
    question: "How much does a dental camp cost?",
    answer:
      "It depends on how many people there are, where the camp is and how long it runs. Send us the details on WhatsApp or with the form below, and we'll reply with a quote.",
  },
  {
    question: "Do people have to get their treatment at RedCity?",
    answer:
      "No. Everyone gets a written note of what we found, and they can take it to any dentist they choose. Anyone who wants to see us can book at the clinic in their own time.",
  },
  {
    question: "Is treatment done at the camp?",
    answer:
      "Camps are for check-ups and advice. If someone needs treatment, it's planned separately at the clinic, where the right equipment is.",
  },
  {
    question: "How do you look after children's information?",
    answer:
      "We see a child only with a parent's or guardian's written consent. Each child's note goes home to their parents, and the school receives a summary with numbers only, never names or results.",
  },
  {
    question: "Where can you hold a camp?",
    answer: `At your workplace, school or college in and around ${business.addressLocality}. Tell us where you are and we'll let you know.`,
  },
];

export default function DentalCampsPage() {
  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", ...buildFaqSchema(CAMP_FAQS) }} />
      <Breadcrumbs
        width="max-w-6xl"
        items={[
          { name: "Home", path: "/" },
          { name: "Dental camps", path: "/dental-camps" },
        ]}
      />

      {/* Hero */}
      <section className="bg-brand-warm pb-20 pt-10">
        <div className={`${container} flex flex-wrap items-center gap-14`}>
          <div className="min-w-0 flex-[1_1_480px]">
            <p className={`hero-in hero-in-1 ${eyebrow}`}>Dental camps</p>
            <h1 className="hero-in hero-in-2 font-headline text-[clamp(2.4rem,4.8vw,3.6rem)] font-extrabold leading-[1.06] tracking-[-0.02em]">
              A dental check-up camp at your{" "}
              <span className="text-brand-red">workplace, school or college.</span>
            </h1>
            <p className="hero-in hero-in-3 mt-5 max-w-[560px] font-body text-[19px] text-brand-muted">
              {business.name}, led by {doctor.name}, {doctor.credentialsShort}, brings the
              check-up to your people in {business.addressLocality}. They find out what their
              teeth need, without taking time off for a first visit.
            </p>
            <div className="hero-in hero-in-4 mt-8 flex flex-wrap gap-3">
              <a href={campWhatsapp} className={btn.primary}>
                <Icon name="chat" size={19} />
                Plan a camp on WhatsApp
              </a>
              <a href={`tel:${business.telephone}`} className={btn.outline}>
                <Icon name="phone" size={18} />
                Call {business.telephoneShort}
              </a>
            </div>
          </div>
          <div className="hero-in hero-in-5 min-w-0 flex-[1_1_380px]">
            <div className="rounded-3xl bg-brand-maroon p-7 text-white shadow-[0_30px_60px_-30px_rgba(43,10,15,0.55)] sm:p-8">
              <p className="font-body text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                Every camp includes
              </p>
              <ul className="mt-5 flex flex-col gap-4 font-body text-[16px]">
                {INCLUDED.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Icon name="check" size={22} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-24">
        <div className={container}>
          <Reveal className="max-w-[720px]">
            <p className={eyebrow}>Who it&apos;s for</p>
            <h2 className={h2}>Planned around the people you look after</h2>
          </Reveal>
          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.title} delay={i} className="h-full">
                <div className="flex h-full flex-col rounded-[22px] border border-brand-line bg-white p-7">
                  <span className="flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-brand-blush text-brand-red">
                    <Icon name={a.icon} size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-headline text-[22px] font-bold">{a.title}</h3>
                  <p className="mt-2 font-body text-[15px] text-brand-muted">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 font-body text-[15px] text-brand-muted">
            Running a camp for a housing society or community group? Ask us too.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-brand-warm py-24">
        <div className={container}>
          <Reveal className="max-w-[720px]">
            <p className={eyebrow}>How it works</p>
            <h2 className={h2}>From first message to the summary</h2>
          </Reveal>
          <ol className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-[20px] bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red font-body text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-headline text-lg font-bold leading-snug">{s.title}</h3>
                <p className="mt-2 font-body text-[15px] text-brand-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we need + honest promises */}
      <section className="py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-2`}>
          <Reveal>
            <p className={eyebrow}>What we need from you</p>
            <h2 className={h2}>A small space and a little help</h2>
            <ul className="mt-7 flex flex-col gap-3.5 font-body text-[17px]">
              {NEEDS.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Icon name="check" size={22} strokeWidth={2.4} className="mt-0.5 shrink-0 text-brand-wa" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1}>
            <div className="rounded-3xl border border-brand-line bg-brand-warm p-7 sm:p-8">
              <p className={eyebrow}>Our promise to your people</p>
              <ul className="mt-2 flex flex-col gap-5 font-body text-[16px]">
                <li>
                  <strong className="block text-brand-ink">No pressure to book</strong>
                  <span className="text-brand-muted">
                    The note is theirs to take to any dentist they choose.
                  </span>
                </li>
                <li>
                  <strong className="block text-brand-ink">Their results stay private</strong>
                  <span className="text-brand-muted">
                    The organiser sees numbers only, never names or anyone&apos;s results. See
                    our{" "}
                    <Link href="/privacy" className="font-semibold text-brand-red underline">
                      privacy policy
                    </Link>
                    .
                  </span>
                </li>
                <li>
                  <strong className="block text-brand-ink">Clear costs if they need treatment</strong>
                  <span className="text-brand-muted">
                    Anyone who comes to the clinic gets a clear estimate before anything starts
                    {pricingApproved ? (
                      <>
                        , and can see our{" "}
                        <Link href="/cost-and-payment" className="font-semibold text-brand-red underline">
                          prices and membership plans
                        </Link>
                      </>
                    ) : null}
                    .
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-brand-warm py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className={eyebrow}>Questions</p>
            <h2 className={h2}>Dental camp questions</h2>
          </Reveal>
          <div className="mt-8">
            <FaqAccordion faqs={CAMP_FAQS} />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="plan" className="scroll-mt-24 py-24">
        <div className={`${container} flex flex-wrap items-start gap-14`}>
          <Reveal className="min-w-0 flex-[1_1_380px]">
            <p className={eyebrow}>Plan a camp</p>
            <h2 className={h2}>Tell us about your group</h2>
            <p className={lead}>
              Send us a few details and we&apos;ll reply on WhatsApp with a plan and a quote.
              Prefer to talk? Call{" "}
              <a href={`tel:${business.telephone}`} className="font-semibold text-brand-red">
                {business.telephoneDisplay}
              </a>
              .
            </p>
          </Reveal>
          <div className="min-w-0 flex-[1_1_480px]">
            <CampForm />
          </div>
        </div>
      </section>
    </main>
  );
}

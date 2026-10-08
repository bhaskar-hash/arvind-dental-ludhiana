"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { whatsappLink } from "@/lib/business";
import { gtagEvent } from "@/lib/gtag";
import { field } from "@/lib/styles";

/**
 * There's no booking backend yet, so these forms don't store anything: on
 * submit they open WhatsApp with the patient's request already written, and
 * the patient sends it themselves. Nothing is kept on the website.
 */

const TOPICS = [
  "Tooth pain",
  "Missing teeth or implants",
  "Dentures",
  "A brighter or straighter smile",
  "My child's teeth",
  "Cost of a treatment",
  "Something else",
];
const TIMES = ["Morning", "Afternoon", "Evening"];

function Field({
  label,
  hint,
  error,
  children,
  id,
  wide,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  id: string;
  wide?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="font-body text-sm font-semibold">
        {label}
        {hint ? <span className="ml-1.5 font-normal text-brand-muted">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="font-body text-sm font-semibold text-brand-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const REQUEST_EVENTS = { callback: "callback_request", booking: "booking_request", camp: "camp_request" } as const;

function useRequest(kind: keyof typeof REQUEST_EVENTS) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: FormEvent<HTMLFormElement>, build: (data: FormData) => string[]) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please add your name.";
    if (String(data.get("phone") ?? "").replace(/\D/g, "").length < 10)
      next.phone = "Please add a 10-digit mobile number.";
    if (!data.get("consent")) next.consent = "Please tick this box so we can contact you.";
    setErrors(next);
    if (Object.keys(next).length) return;

    gtagEvent({ action: REQUEST_EVENTS[kind], params: {} });
    window.open(whatsappLink(build(data).join("\n")), "_blank", "noopener,noreferrer");
  }

  return { errors, submit };
}

function Consent({ id, error }: { id: string; error?: string }) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={id} className="flex items-start gap-3 font-body text-sm text-brand-muted">
        <input
          id={id}
          name="consent"
          type="checkbox"
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-[22px] w-[22px] shrink-0 accent-brand-red"
        />
        <span>
          I agree to RedCity Dental contacting me about this request by phone or WhatsApp. My
          details are used only for this. See our{" "}
          <Link href="/privacy" className="font-semibold text-brand-red underline">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 font-body text-sm font-semibold text-brand-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const formShell =
  "grid gap-5 rounded-3xl border border-brand-line bg-white p-6 shadow-[0_24px_48px_-28px_rgba(43,10,15,0.35)] sm:grid-cols-2 sm:p-8";

const submitBtn =
  "sm:col-span-2 min-h-[54px] rounded-xl bg-brand-red font-body text-base font-semibold text-white hover:bg-brand-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2";

export function CallbackForm() {
  const id = useId();
  const { errors, submit } = useRequest("callback");

  return (
    <form
      noValidate
      onSubmit={(e) =>
        submit(e, (d) => [
          "Hi, I'd like a call back from RedCity Dental Care.",
          `Name: ${d.get("name")}`,
          `Mobile: ${d.get("phone")}`,
          `About: ${d.get("topic")}`,
          `Best time to call: ${d.get("time")}`,
        ])
      }
      className={formShell}
    >
      <h3 className="font-headline text-[22px] font-bold sm:col-span-2">Request a call back</h3>
      <Field label="Your name" id={`${id}-name`} error={errors.name} wide>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} className={field} />
      </Field>
      <Field label="Mobile number" id={`${id}-phone`} error={errors.phone} wide>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} className={field} />
      </Field>
      <Field label="What would you like help with?" id={`${id}-topic`}>
        <select id={`${id}-topic`} name="topic" className={field}>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Best time to call" id={`${id}-time`}>
        <select id={`${id}-time`} name="time" className={field}>
          {TIMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Consent id={`${id}-consent`} error={errors.consent} />
      <button type="submit" className={submitBtn}>
        Request a call back
      </button>
      <p className="font-body text-xs text-brand-muted sm:col-span-2">
        This opens WhatsApp with your request ready to send. Nothing is stored on this website.
      </p>
    </form>
  );
}

export function BookingForm() {
  const id = useId();
  const { errors, submit } = useRequest("booking");

  return (
    <form
      noValidate
      onSubmit={(e) =>
        submit(e, (d) => {
          const day = String(d.get("day") ?? "");
          const note = String(d.get("note") ?? "").trim();
          return [
            "Hi, I'd like to book a consultation at RedCity Dental Care.",
            `Name: ${d.get("name")}`,
            `Mobile: ${d.get("phone")}`,
            day ? `Preferred day: ${new Date(day).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}` : "Preferred day: any",
            `Preferred time: ${d.get("time")}`,
            ...(note ? [`About: ${note}`] : []),
          ];
        })
      }
      className={formShell}
    >
      <Field label="Your name" id={`${id}-name`} error={errors.name}>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} className={field} />
      </Field>
      <Field label="Mobile number" id={`${id}-phone`} error={errors.phone}>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} className={field} />
      </Field>
      <Field label="Preferred day" id={`${id}-day`}>
        <input id={`${id}-day`} name="day" type="date" className={field} />
      </Field>
      <Field label="Preferred time" id={`${id}-time`}>
        <select id={`${id}-time`} name="time" className={field}>
          {TIMES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="What's bothering you?" hint="Optional" id={`${id}-note`} wide>
        <textarea id={`${id}-note`} name="note" rows={3} className={`${field} py-3`} />
      </Field>
      <Consent id={`${id}-consent`} error={errors.consent} />
      <button type="submit" className={submitBtn}>
        Request this appointment
      </button>
      <p className="font-body text-xs text-brand-muted sm:col-span-2">
        This opens WhatsApp with your request ready to send, and we confirm the time with you.
        Nothing is stored on this website.
      </p>
    </form>
  );
}

const ORG_TYPES = ["Company or office", "School", "College or university", "Housing society or other group"];

/** Enquiry for a dental check-up camp at a workplace, school or college. */
export function CampForm() {
  const id = useId();
  const { errors, submit } = useRequest("camp");

  return (
    <form
      noValidate
      onSubmit={(e) =>
        submit(e, (d) => {
          const optional = (key: string, label: string) => {
            const v = String(d.get(key) ?? "").trim();
            return v ? [`${label}: ${v}`] : [];
          };
          return [
            "Hi, I'd like to plan a dental camp with RedCity Dental Care.",
            `Name: ${d.get("name")}`,
            `Mobile: ${d.get("phone")}`,
            `Organisation: ${String(d.get("org") ?? "").trim() || "not given"} (${d.get("type")})`,
            ...optional("people", "About how many people"),
            ...optional("dates", "Preferred dates"),
            ...optional("place", "Where"),
            ...optional("note", "Anything else"),
          ];
        })
      }
      className={formShell}
    >
      <h3 className="font-headline text-[22px] font-bold sm:col-span-2">Plan a dental camp</h3>
      <Field label="Your name" id={`${id}-name`} error={errors.name}>
        <input id={`${id}-name`} name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} className={field} />
      </Field>
      <Field label="Mobile number" id={`${id}-phone`} error={errors.phone}>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" aria-invalid={!!errors.phone} className={field} />
      </Field>
      <Field label="Organisation name" id={`${id}-org`}>
        <input id={`${id}-org`} name="org" type="text" autoComplete="organization" className={field} />
      </Field>
      <Field label="Type of organisation" id={`${id}-type`}>
        <select id={`${id}-type`} name="type" className={field}>
          {ORG_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="About how many people?" hint="Optional" id={`${id}-people`}>
        <input id={`${id}-people`} name="people" type="number" inputMode="numeric" min={1} className={field} />
      </Field>
      <Field label="Preferred dates" hint="Optional" id={`${id}-dates`}>
        <input id={`${id}-dates`} name="dates" type="text" placeholder="e.g. a weekday in November" className={field} />
      </Field>
      <Field label="Where in Ludhiana?" hint="Optional" id={`${id}-place`} wide>
        <input id={`${id}-place`} name="place" type="text" className={field} />
      </Field>
      <Field label="Anything else we should know?" hint="Optional" id={`${id}-note`} wide>
        <textarea id={`${id}-note`} name="note" rows={3} className={`${field} py-3`} />
      </Field>
      <Consent id={`${id}-consent`} error={errors.consent} />
      <button type="submit" className={submitBtn}>
        Send camp request
      </button>
      <p className="font-body text-xs text-brand-muted sm:col-span-2">
        This opens WhatsApp with your request ready to send, and we reply with a plan and a
        quote. Nothing is stored on this website.
      </p>
    </form>
  );
}

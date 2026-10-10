import { useState, type FormEvent } from "react";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/copy";
import { waLink, waLinkProps } from "@/lib/whatsapp";

// Web3Forms access keys are designed to be public (they only allow sending to the owner's inbox).
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const ENDPOINT = "https://api.web3forms.com/submit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = Partial<Record<"name" | "business" | "phone" | "email" | "consent", string>>;
type Status = { state: "idle" } | { state: "sending" } | { state: "sent"; name: string; viaEmailApp?: boolean } | { state: "error" };

function validate(v: Record<string, string>, consent: boolean): Errors {
  const errors: Errors = {};
  if (!v.name) errors.name = "Please enter your name.";
  if (!v.business) errors.business = "Please enter your business name.";
  if (v.phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a phone number we can call.";
  if (!EMAIL_RE.test(v.email)) errors.email = "Please enter a valid email address.";
  if (!consent) errors.consent = "Please tick the box so we can reply to you.";
  return errors;
}

export function FallbackContact({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-sm text-muted">Prefer to chat?</p>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <Button size="lg" className="w-full bg-[#25D366] text-stone-fg hover:bg-[#1fbe5b] sm:flex-1" asChild>
          <a href={waLink()} {...waLinkProps}>
            <WhatsAppIcon />
            WhatsApp
          </a>
        </Button>
        <Button size="lg" variant="ghost" className="w-full sm:flex-1" asChild>
          <a href={contact.phoneHref}>
            <Phone className="size-4" />
            Call {contact.phone}
          </a>
        </Button>
      </div>
    </div>
  );
}

/** The one enquiry form behind every call to action. Delivers to the owner's inbox via Web3Forms. */
export function EnquiryForm({
  source,
  defaultMessage = "",
  onDone,
}: {
  source: string;
  defaultMessage?: string;
  onDone: () => void;
}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "sending") return;
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const values = {
      name: get("name").slice(0, 120),
      business: get("business").slice(0, 160),
      phone: get("phone").slice(0, 40),
      email: get("email").slice(0, 200),
      message: get("message").slice(0, 2000),
    };

    // Honeypot: real visitors never see this field. Bots that fill it get a quiet fake success.
    if (get("company_website")) {
      setStatus({ state: "sent", name: values.name || "there" });
      return;
    }

    const found = validate(values, data.get("consent") === "on");
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    if (!ACCESS_KEY) {
      // No form-service key yet: hand the enquiry to the visitor's email app, addressed and filled in,
      // so nothing they typed is lost.
      const body = [
        `Name: ${values.name}`,
        `Business: ${values.business}`,
        `Phone: ${values.phone}`,
        `Email: ${values.email}`,
        "",
        values.message || "(no message)",
        "",
        `Sent from: ${source}`,
      ].join("\n");
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        `DIGIT AI enquiry: ${values.business}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus({ state: "sent", name: values.name, viaEmailApp: true });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `DIGIT AI enquiry: ${values.business}`,
          from_name: "DIGIT AI website",
          source,
          name: values.name,
          business: values.business,
          phone: values.phone,
          email: values.email,
          message: values.message || "(no message)",
          consent: "Agreed to the privacy policy",
        }),
      });
      const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !json?.success) throw new Error("Delivery failed");
      setStatus({ state: "sent", name: values.name });
    } catch {
      setStatus({ state: "error" });
    }
  }

  const inputClass =
    "mt-1.5 h-12 w-full rounded-md bg-raised px-3 text-base text-fg outline-none ring-1 ring-line placeholder:text-subtle focus:ring-2 focus:ring-stone aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-400";

  if (status.state === "sent") {
    return (
      <div className="confirm-enter mt-7" role="status">
        <p className="text-base leading-relaxed text-fg">
          {status.viaEmailApp ? (
            <>
              Thanks, {status.name}. Your email app should have opened with your enquiry to {contact.email} — press
              send there and it reaches us. Nothing opened? WhatsApp or call {contact.phone}.
            </>
          ) : (
            <>
              Thanks, {status.name}. Your enquiry has reached us. We’ll reply the same or next working day. Need
              us sooner? WhatsApp or call {contact.phone}.
            </>
          )}
        </p>
        <FallbackContact className="mt-5" />
        <Button className="mt-4 w-full" variant="ghost" onClick={onDone}>
          Close
        </Button>
      </div>
    );
  }

  const field = (id: keyof Errors) => ({
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
  });
  const fieldError = (id: keyof Errors) =>
    errors[id] ? (
      <span id={`${id}-error`} className="mt-1 block text-xs text-red-300">
        {errors[id]}
      </span>
    ) : null;

  return (
    <>
      <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit} noValidate>
        <label className="block">
          <span className="text-sm font-medium text-muted">Name *</span>
          <input name="name" autoComplete="name" maxLength={120} required className={inputClass} {...field("name")} />
          {fieldError("name")}
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted">Business name *</span>
          <input name="business" autoComplete="organization" maxLength={160} required className={inputClass} {...field("business")} />
          {fieldError("business")}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-muted">Phone *</span>
            <input name="phone" type="tel" autoComplete="tel" maxLength={40} required className={inputClass} {...field("phone")} />
            {fieldError("phone")}
          </label>
          <label className="block">
            <span className="text-sm font-medium text-muted">Email *</span>
            <input name="email" type="email" autoComplete="email" maxLength={200} required className={inputClass} {...field("email")} />
            {fieldError("email")}
          </label>
        </div>
        <label className="block">
          <span className="text-sm font-medium text-muted">
            Message <span className="text-subtle">(optional)</span>
          </span>
          <textarea
            name="message"
            rows={3}
            maxLength={2000}
            defaultValue={defaultMessage}
            className={`${inputClass} h-auto min-h-24 py-3`}
          />
        </label>

        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Leave this field empty
            <input name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm leading-snug text-muted">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 size-5 shrink-0 accent-[#cdff00]"
              {...field("consent")}
            />
            <span>
              I agree that DIGIT AI can use these details to reply to my enquiry, as set out in the{" "}
              <a href="/privacy" target="_blank" rel="noopener" className="text-fg underline underline-offset-2">
                Privacy policy
              </a>
              . *
            </span>
          </label>
          {fieldError("consent")}
        </div>

        {status.state === "error" ? (
          <p role="alert" className="rounded-md bg-red-500/10 p-3 text-sm leading-relaxed text-red-200">
            Sorry, that didn’t send. Please WhatsApp or call {contact.phone} instead.
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
      </form>
      <FallbackContact className="mt-6 border-t border-line pt-5" />
    </>
  );
}

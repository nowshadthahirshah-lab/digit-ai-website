import { useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Mail, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { bookLabel, contact, industries } from "@/lib/copy";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

const LEAKS = [
  "Missed calls",
  "Slow replies to enquiries",
  "Quotes not followed up",
  "No-shows & cancellations",
  "Not enough reviews",
  "Not sure yet",
] as const;

type Channel = "whatsapp" | "email";

function mailtoLink(subject: string, body: string) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * The site has no server inbox, so the audit request is delivered through channels that
 * actually reach the owner: a pre-filled WhatsApp chat or email. Nothing is stored locally.
 */
export function BookDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [sent, setSent] = useState<Channel | null>(null);
  // The composed request, kept so the fallback links resend exactly what the visitor typed.
  const [request, setRequest] = useState<{ message: string; subject: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === "email" ? "email" : "whatsapp";
    const data = new FormData(e.currentTarget);
    const field = (k: string) => String(data.get(k) ?? "").trim();

    const lines = [
      waMessages.audit,
      "",
      `Name: ${field("name")}`,
      `Business: ${field("business")}`,
      `Industry: ${field("industry")}`,
      `Biggest leak: ${field("leak")}`,
      field("contact") ? `Best contact: ${field("contact")}` : "",
    ].filter((l, i, all) => l !== "" || all[i - 1] !== "");
    const message = lines.join("\n").trim();
    const subject = `Growth audit — ${field("business")}`;

    if (channel === "whatsapp") {
      window.open(waLink(message), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoLink(subject, message);
    }
    setRequest({ message, subject });
    setSent(channel);
  }

  function close() {
    onOpenChange(false);
    setTimeout(() => {
      setSent(null);
      setRequest(null);
    }, 240);
  }

  const inputClass =
    "mt-1.5 h-12 w-full rounded-md bg-raised px-3 text-base text-fg outline-none ring-1 ring-line placeholder:text-subtle focus:ring-2 focus:ring-stone";

  return (
    <Dialog.Root open={open} onOpenChange={(v) => (v ? onOpenChange(true) : close())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/75 backdrop-blur-sm" />
        {/* Bottom sheet on phones (thumb reach, scrolls above the keyboard); centred card from sm up. */}
        <Dialog.Content className="sheet-enter fixed inset-x-0 bottom-0 z-50 max-h-[92svh] overflow-y-auto overscroll-contain rounded-t-xl bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-lift)] outline-none sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[calc(100svh-2rem)] sm:w-[min(92vw,30rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Growth audit · short call</p>
              <Dialog.Title className="mt-2 font-display text-4xl leading-none font-extrabold uppercase">
                {sent ? "Almost there." : bookLabel}
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm leading-relaxed text-muted">
                {sent
                  ? sent === "whatsapp"
                    ? "WhatsApp should have opened with your details filled in — just press send and we’ll reply with a time."
                    : "Your email app should have opened with your details filled in — just press send and we’ll reply with a time."
                  : "Tell us a little about your business. We’ll map where enquiries leak today and what an automated system would change."}
              </Dialog.Description>
            </div>
            <Dialog.Close className="-mt-2 -mr-2 grid size-11 shrink-0 place-items-center rounded-md text-muted hover:text-fg">
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          {sent ? (
            <div className="confirm-enter mt-7">
              <p className="text-sm text-muted">Didn’t open? These send the same details:</p>
              <div className="mt-3 flex flex-col gap-2">
                <Button size="lg" className="w-full bg-[#25D366] text-stone-fg hover:bg-[#1fbe5b]" asChild>
                  <a href={waLink(request?.message ?? waMessages.audit)} {...waLinkProps}>
                    <WhatsAppIcon />
                    Open WhatsApp again
                  </a>
                </Button>
                <Button size="lg" variant="ghost" className="w-full" asChild>
                  <a href={request ? mailtoLink(request.subject, request.message) : `mailto:${contact.email}`}>
                    <Mail className="size-4" />
                    Send by email instead
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-subtle">
                Or reach us directly on WhatsApp <span className="whitespace-nowrap">{contact.whatsappDisplay}</span> or{" "}
                <span className="break-all">{contact.email}</span>.
              </p>
              <Button className="mt-4 w-full" onClick={close} variant="ghost">
                Close
              </Button>
            </div>
          ) : (
            <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
              <label className="block">
                <span className="text-sm font-medium text-muted">Your name</span>
                <input required name="name" autoComplete="name" className={inputClass} />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-muted">Business</span>
                <input required name="business" autoComplete="organization" className={inputClass} />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-muted">Industry</span>
                  <select name="industry" defaultValue="" required className={inputClass}>
                    <option value="" disabled>
                      Choose…
                    </option>
                    {industries.map((i) => (
                      <option key={i.key}>{i.name}</option>
                    ))}
                    <option>Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-muted">Biggest leak</span>
                  <select name="leak" defaultValue="Not sure yet" className={inputClass}>
                    {LEAKS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-muted">
                  Best phone or email <span className="text-subtle">(optional)</span>
                </span>
                <input name="contact" autoComplete="email" className={inputClass} />
              </label>
              <div className="mt-2 flex flex-col gap-2">
                <Button type="submit" name="channel" value="whatsapp" size="lg" className="w-full bg-[#25D366] text-stone-fg hover:bg-[#1fbe5b]">
                  <WhatsAppIcon />
                  Send on WhatsApp
                </Button>
                <Button type="submit" name="channel" value="email" size="lg" variant="ghost" className="w-full">
                  <Mail className="size-4" />
                  Send by email instead
                </Button>
              </div>
              <p className="text-xs leading-relaxed text-subtle">
                Your details go straight to DIGIT AI through WhatsApp or email. We don’t store them on this site.
              </p>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

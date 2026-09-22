import { useState, type FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const INTEREST = ["Site", "Site + Diary", "Growth", "Not sure yet"] as const;

export function BookDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      email: String(data.get("email") ?? ""),
      interest: String(data.get("interest") ?? ""),
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("digit-enquiries") ?? "[]") as unknown[];
      localStorage.setItem("digit-enquiries", JSON.stringify([payload, ...prev].slice(0, 20)));
    } catch {
      /* ignore quota */
    }
    setSent(true);
  }

  function close() {
    onOpenChange(false);
    setTimeout(() => setSent(false), 240);
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => (v ? onOpenChange(true) : close())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-display text-2xl font-bold tracking-tight">
                {sent ? "You’re on the list." : "Book a 20-minute call"}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted">
                {sent
                  ? "We’ll reply within a working day with a time. If both September slots are gone, we’ll say so."
                  : "Two slots left this month. Tell us who you are and we’ll send a time."}
              </Dialog.Description>
            </div>
            <Dialog.Close className="grid size-10 place-items-center rounded-md text-muted hover:text-fg">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          {sent ? (
            <div className="confirm-enter mt-8">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 32 32" className="size-8 text-stone" aria-hidden="true">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="check-ring is-on"
                  />
                  <path
                    d="M9.5 16.4 13.8 20.5 22.5 11.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-draw is-on"
                  />
                </svg>
                <p className="text-sm text-muted">Held. We’ll send a time.</p>
              </div>
              <Button className="mt-6 w-full" onClick={close} variant="ghost">
                Close
              </Button>
            </div>
          ) : (
            <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
              <label className="block">
                <span className="text-xs font-medium text-muted">Your name</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="mt-1.5 h-11 w-full rounded-md bg-raised px-3 text-sm text-fg outline-none ring-1 ring-line focus:ring-stone"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Business</span>
                <input
                  required
                  name="business"
                  className="mt-1.5 h-11 w-full rounded-md bg-raised px-3 text-sm text-fg outline-none ring-1 ring-line focus:ring-stone"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-1.5 h-11 w-full rounded-md bg-raised px-3 text-sm text-fg outline-none ring-1 ring-line focus:ring-stone"
                />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-muted">Interested in</span>
                <select
                  name="interest"
                  defaultValue="Site + Diary"
                  className="mt-1.5 h-11 w-full rounded-md bg-raised px-3 text-sm text-fg outline-none ring-1 ring-line focus:ring-stone"
                >
                  {INTEREST.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <Button type="submit" className="mt-2 w-full" size="lg">
                Request a slot
              </Button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

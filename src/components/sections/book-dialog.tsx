import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { bookLabel, websites } from "@/lib/copy";

export type EnquiryIntent = "audit" | "website";

const INTENTS = {
  audit: {
    eyebrow: "Growth audit · short call",
    title: bookLabel,
    description:
      "Tell us a little about your business. We’ll map where enquiries leak today and what an automated system would change.",
    source: "Growth audit",
    message: "",
  },
  website: {
    eyebrow: "Websites · free concept",
    title: websites.cta,
    description: "Send your details and I’ll design your new homepage before you commit to anything.",
    source: "Website: free concept homepage",
    message: websites.ctaMessage,
  },
} as const;

export function BookDialog({
  open,
  intent,
  onOpenChange,
}: {
  open: boolean;
  intent: EnquiryIntent;
  onOpenChange: (v: boolean) => void;
}) {
  const copy = INTENTS[intent];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/75 backdrop-blur-sm" />
        {/* Bottom sheet on phones (thumb reach, scrolls above the keyboard); centred card from sm up. */}
        <Dialog.Content className="sheet-enter fixed inset-x-0 bottom-0 z-50 max-h-[92svh] overflow-y-auto overscroll-contain rounded-t-xl bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-lift)] outline-none sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[calc(100svh-2rem)] sm:w-[min(92vw,32rem)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <Dialog.Title className="mt-2 font-display text-4xl leading-none font-extrabold uppercase">
                {copy.title}
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm leading-relaxed text-muted">
                {copy.description}
              </Dialog.Description>
            </div>
            <Dialog.Close className="-mt-2 -mr-2 grid size-11 shrink-0 place-items-center rounded-md text-muted hover:text-fg">
              <X className="size-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          {/* Remounts on every open (Radix unmounts closed content), so state never leaks between CTAs. */}
          <EnquiryForm
            source={copy.source}
            defaultMessage={copy.message}
            onDone={() => onOpenChange(false)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

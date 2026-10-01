import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { cn } from "@/lib/utils";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

// Sections that already show their own WhatsApp link: the float steps aside while any is on screen.
const OWN_WHATSAPP = ["top", "contact", "site-footer"];

/**
 * Persistent "Chat on WhatsApp" button. Sits below the header layer (z-30), so the mobile
 * menu and the booking dialog always cover it.
 */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScreen = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target.id);
        else onScreen.delete(e.target.id);
      }
      setShow(onScreen.size === 0);
    });
    for (const id of OWN_WHATSAPP) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={waLink(waMessages.general)}
      {...waLinkProps}
      // Starts with the visible label so speech-input users can say what they see (WCAG 2.5.3).
      aria-label="Chat on WhatsApp with DIGIT AI"
      tabIndex={show ? 0 : -1}
      aria-hidden={show ? undefined : true}
      className={cn(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 flex items-center gap-2.5 rounded-full bg-[#25D366] p-3.5 text-stone-fg shadow-[0_12px_32px_-8px_rgb(37_211_102/0.55),0_0_0_1px_rgb(255_255_255/0.12)]",
        "transition-[opacity,transform,background-color] duration-300 hover:bg-[#1fbe5b] sm:right-6 sm:bottom-6 sm:py-3 sm:pr-5 sm:pl-4",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span className="relative grid place-items-center">
        <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s] motion-reduce:hidden" />
        <WhatsAppIcon className="relative size-6" />
      </span>
      <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}

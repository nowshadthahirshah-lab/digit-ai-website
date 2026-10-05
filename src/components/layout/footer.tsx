import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { Logo } from "@/components/brand/logo";
import { contact, footer, nav, site } from "@/lib/copy";
import { waLink, waLinkProps, waMessages } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{footer.note}</p>
        </div>
        <div>
          <p className="eyebrow">On this page</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={`/${item.href}`} className="inline-flex min-h-11 min-w-11 items-center text-sm text-muted hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <p className="mt-3 text-sm text-fg">{contact.owner}</p>
          <a href={contact.phoneHref} className="flex min-h-11 items-center text-sm text-muted hover:text-fg">
            {contact.phone}
          </a>
          <a
            href={waLink(waMessages.general)}
            {...waLinkProps}
            className="flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
          >
            <WhatsAppIcon className="size-4 text-[#25D366]" />
            WhatsApp <span className="whitespace-nowrap">{contact.whatsappDisplay}</span>
          </a>
          <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center text-sm break-all text-muted hover:text-fg">
            {contact.email}
          </a>
          <p className="mt-1 text-sm text-subtle">{contact.location}</p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] font-mono text-[0.7rem] tracking-[0.1em] text-subtle uppercase sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.legal}
          </p>
          <p>{site.tag}</p>
          <p>
            {site.legal} · {contact.location}
          </p>
          <a href="/privacy" className="inline-flex min-h-11 items-center hover:text-fg">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}

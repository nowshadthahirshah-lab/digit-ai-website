import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Clock, MessageSquareReply, Star, UserCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { SiteFooter } from "@/components/layout/footer";
import { Galaxy } from "@/components/motion/galaxy";
import { Reveal } from "@/components/motion/reveal";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { bookingLink, contact } from "@/lib/copy";
import { waLink, waLinkProps } from "@/lib/whatsapp";

// Niche landing page for UK aesthetics and private clinics. No stats, client names or treatment claims:
// everything here describes what we install, not results we can't yet show.

const AUDIT_LABEL = "Book a free Clinic Enquiry Audit";
const WA_MESSAGE =
  "Hi DIGIT AI — I run a clinic and I'd like a free Clinic Enquiry Audit — can you look at how we handle DMs and bookings?";

export const Route = createFileRoute("/clinics")({
  head: () => ({
    meta: [
      { title: "For clinics — DIGIT AI" },
      {
        name: "description",
        content:
          "Instant replies, online booking, reminders and follow-up for UK aesthetics and private clinics. Book a free Clinic Enquiry Audit.",
      },
    ],
  }),
  component: Clinics,
});

const problems = [
  {
    icon: MessageSquareReply,
    title: "DMs go unanswered",
    body: "Instagram and Facebook messages land while you’re with a client. By the time you reply, the person asking has often moved on.",
  },
  {
    icon: Clock,
    title: "Replies come too late",
    body: "Evening and weekend enquiries wait until the next working day — exactly when people are comparing clinics.",
  },
  {
    icon: UserCheck,
    title: "No-shows cost you the slot",
    body: "A missed appointment is an empty chair you can’t resell at short notice, and no one followed up to rebook.",
  },
];

const installs = [
  { title: "Instant reply", body: "Every DM, form and missed call gets a friendly, on-brand reply within seconds — day or night." },
  { title: "Booking", body: "Enquiries are guided to a time in your existing booking system, without the back-and-forth." },
  { title: "Reminders", body: "Confirmations and reminders by SMS or WhatsApp before each appointment, with an easy way to reschedule." },
  { title: "Follow-up", body: "People who asked but didn’t book get a timely, human-sounding nudge instead of being forgotten." },
  { title: "Reviews", body: "After a visit, clients are asked for a Google review while the experience is still fresh." },
];

const steps = [
  "A short call about how enquiries reach you today",
  "We map where messages and bookings slip through",
  "You get a plain-English plan — what we’d install and what it costs",
];

function Clinics() {
  return (
    <div className="min-h-svh bg-bg text-fg">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/" aria-label="DIGIT AI home" className="inline-flex min-h-11 items-center">
            <Logo />
          </a>
          <Button asChild>
            <a href="#audit">Free audit</a>
          </Button>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden">
          <Galaxy variant="ambient" className="-z-10" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%]"
            style={{ background: "radial-gradient(60% 80% at 50% 100%, rgb(205 255 0 / 0.12), transparent 70%)" }}
          />
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 md:pt-28 md:pb-32">
            <Reveal>
              <Eyebrow>For UK aesthetics &amp; private clinics</Eyebrow>
              <h1 className="mt-5 max-w-[14ch] font-display text-[clamp(3rem,13vw,6.5rem)]">
                Never miss another enquiry.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                We install the system that answers your DMs instantly, books clients into your diary, reminds them
                before they arrive and follows up when they don’t — so you can stay with the client in front of you.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="btn-glow w-full sm:w-auto" asChild>
                  <a href="#audit">
                    {AUDIT_LABEL}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="ghost" className="w-full bg-bg/40 backdrop-blur-sm sm:w-auto" asChild>
                  <a href={waLink(WA_MESSAGE)} {...waLinkProps}>
                    <WhatsAppIcon className="text-[#25D366]" />
                    WhatsApp {contact.whatsappDisplay}
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <Reveal>
              <Eyebrow n="01">The problem</Eyebrow>
              <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.5rem,10vw,4.75rem)]">
                Busy clinics lose bookings in the inbox.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {problems.map(({ icon: Icon, title, body }) => (
                <Reveal key={title}>
                  <div className="h-full rounded-xl bg-surface p-6 ring-1 ring-line">
                    <Icon className="size-6 text-stone" aria-hidden="true" />
                    <h3 className="mt-4 font-sans text-lg font-bold tracking-normal normal-case">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <Reveal>
              <Eyebrow n="02">What we install</Eyebrow>
              <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2.5rem,10vw,4.75rem)]">
                One connected system, working while you treat.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                It connects to the booking tools you already use, such as Fresha, Setmore, Acuity or Google
                Calendar.
              </p>
            </Reveal>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-5">
              {installs.map((item, i) => (
                <li key={item.title} className="bg-bg p-6">
                  <span className="font-mono text-xs tracking-[0.1em] text-stone">0{i + 1}</span>
                  <h3 className="mt-3 font-sans text-lg font-bold tracking-normal normal-case">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle">
              <span className="inline-flex items-center gap-2">
                <CalendarCheck className="size-4 text-stone" aria-hidden="true" /> Uses your existing booking system
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="size-4 text-stone" aria-hidden="true" /> Written in your clinic’s tone of voice
              </span>
            </div>
          </div>
        </section>

        <section id="audit" className="scroll-mt-16 border-t border-line">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.1fr] md:py-28">
            <Reveal>
              <Eyebrow n="03">Free audit</Eyebrow>
              <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.5rem,10vw,4.75rem)]">
                Free Clinic Enquiry Audit.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                No obligation and no hard sell. Here’s what happens:
              </p>
              <ol className="mt-6 flex flex-col gap-3">
                {steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-base text-fg">
                    <span className="font-mono text-sm text-stone">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ol>
              {bookingLink.url ? (
                <Button size="lg" variant="ghost" className="mt-8 w-full sm:w-auto" asChild>
                  <a href={bookingLink.url} target="_blank" rel="noopener noreferrer">
                    <CalendarCheck className="size-4" />
                    {bookingLink.label}
                  </a>
                </Button>
              ) : null}
            </Reveal>
            <div className="rounded-xl bg-surface p-5 ring-1 ring-line sm:p-7">
              <p className="font-sans text-xl font-bold tracking-normal normal-case">{AUDIT_LABEL}</p>
              <p className="mt-2 text-sm text-muted">Tell us about your clinic and we’ll be in touch to arrange it.</p>
              <EnquiryForm
                source="Clinics page — Clinic Enquiry Audit"
                defaultMessage="I run a clinic and would like a free Clinic Enquiry Audit."
                onDone={() => {}}
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

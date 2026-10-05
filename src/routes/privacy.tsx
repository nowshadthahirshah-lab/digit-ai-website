import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { SiteFooter } from "@/components/layout/footer";
import { contact } from "@/lib/copy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — DIGIT AI" },
      { name: "description", content: "How DIGIT AI collects, uses and protects personal data from this website." },
    ],
  }),
  component: Privacy,
});

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <>
        {contact.legalName}, trading as DIGIT AI, Canning Town, London {contact.postalAddress}, is the data
        controller for personal data collected through this website. Contact: {contact.email} · {contact.phone}.
      </>
    ),
  },
  {
    title: "What we collect",
    body: (
      <>
        When you use our enquiry form, we collect your name, business name, phone number, email address and
        anything you write in your message. Our hosting provider may also log technical data such as your IP
        address and browser type, for security purposes. [Analytics: none / name of tool].
      </>
    ),
  },
  {
    title: "Why we use it",
    body: (
      <>
        To reply to your enquiry, discuss and quote for work you’ve asked about, and keep a record of our
        conversation. We don’t sell your data or use it for unrelated marketing.
      </>
    ),
  },
  {
    title: "Lawful basis (UK GDPR Art. 6)",
    body: (
      <>
        <em>Legitimate interests</em> in responding to business enquiries, and <em>steps prior to entering a
        contract</em> at your request. Where we rely on your consent, you can withdraw it at any time.
      </>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <>
        Enquiries that don’t become work are deleted after [12] months. Client records are kept for [6 years]
        for accounting and legal purposes.
      </>
    ),
  },
  {
    title: "Who processes it for us",
    body: (
      <>
        Vercel Inc. (website hosting); Web3Forms (form delivery); Google (Gmail email). Some of these providers
        may process data outside the UK under appropriate safeguards, such as the UK International Data Transfer
        Addendum or adequacy regulations.
      </>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        You can ask to access, correct or delete your data, restrict or object to how we use it, or receive a
        copy of it (data portability). Email {contact.email}. We’ll reply within one month.
      </>
    ),
  },
  {
    title: "Complaints",
    body: (
      <>
        Please contact us first. You also have the right to complain to the Information Commissioner’s Office
        (ICO): ico.org.uk · 0303 123 1113.
      </>
    ),
  },
  {
    title: "Cookies",
    body: <>[this site uses only essential cookies / list any analytics cookies].</>,
  },
];

function Privacy() {
  return (
    <div className="min-h-svh bg-bg text-fg">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-5 sm:px-8">
          <a href="/" aria-label="DIGIT AI home" className="inline-flex min-h-11 items-center">
            <Logo />
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 md:py-20">
        <h1 className="font-display text-[clamp(2.75rem,12vw,5rem)]">Privacy Policy</h1>
        <p className="mt-4 text-sm text-subtle">Last updated: [date]</p>
        <div className="mt-10 flex flex-col gap-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-sans text-xl font-bold tracking-normal normal-case">{s.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-muted">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

import { contact } from "@/lib/copy";

/** Click-to-chat link for the DIGIT AI WhatsApp number, optionally with a pre-filled message. */
export function waLink(message?: string) {
  const base = `https://wa.me/${contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Pre-filled openers, so every conversation arrives with context. */
export const waMessages = {
  general: "Hi DIGIT AI — I’d like to know more about your AI growth systems.",
  audit: "Hi DIGIT AI — I’d like to book a growth audit.",
  industry: (audience: string) =>
    `Hi DIGIT AI — I’d like to see how your growth system works for ${audience}. Could we talk about my business?`,
  plan: (name: string) => `Hi DIGIT AI — I’m interested in the ${name} plan. Can we talk?`,
  projection: (p: { missed: number; value: string; close: number; monthly: string; annual: string }) =>
    [
      "Hi DIGIT AI — I ran your growth calculator:",
      `• ${p.missed} missed ${p.missed === 1 ? "enquiry" : "enquiries"} a week`,
      `• ${p.value} average job value`,
      `• ${p.close}% close rate`,
      `Example projection: ${p.monthly}/month (${p.annual} a year).`,
      "Can we talk about recovering this?",
    ].join("\n"),
};

/** Shared attributes for any link that leaves the site for WhatsApp. */
export const waLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

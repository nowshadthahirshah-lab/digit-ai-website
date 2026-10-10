// Site copy. No client results, testimonials or statistics appear here unless they can be
// verified — scenarios and projections are labelled as illustrative wherever they're shown.

export const site = {
  name: "DIGIT",
  legal: "DIGIT AI",
  tag: "The next generation of business growth.",
  // Absolute URL for social share cards (og:image must be absolute).
  // Switch to "https://digit-ai.co.uk" once the domain's DNS points at Vercel — until then it doesn't resolve.
  url: "https://digit-ai-v2.vercel.app",
};

export const contact = {
  owner: "Shah",
  location: "London",
  phone: "07405 286985",
  phoneHref: "tel:+447405286985",
  whatsapp: "447405286985",
  whatsappDisplay: "+44 7405 286985",
  email: "info@digit-ai.co.uk",
  legalName: "THAHIRSHAH NOWSHAD",
  postalAddress: "236C Billet Road, London E17 5DY",
};

export const nav = [
  { href: "#solutions", label: "Solutions" },
  { href: "#websites", label: "Websites" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#industries", label: "Industries" },
  { href: "#results", label: "Examples" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

export const bookLabel = "Book a free Growth Audit";

// BOOKING LINK PLACEHOLDER — paste your Calendly (or similar) URL here, e.g. "https://calendly.com/digit-ai/audit".
// While it is empty, the "Pick a time" button stays hidden and visitors use the enquiry form, WhatsApp or phone.
export const bookingLink = {
  url: "",
  label: "Pick a time in the calendar",
};

export const hero = {
  eyebrow: "AI growth systems for UK businesses",
  lines: ["The next", "generation", "of business", "growth."],
  lede: "DIGIT AI builds intelligent growth systems that capture opportunities, automate follow-up and turn more conversations into revenue.",
  primary: "See DIGIT AI in Action",
  steps: ["Capture", "Respond", "Qualify", "Follow up", "Book", "Grow"],
};

export const capabilities = [
  "Website design",
  "Lead capture",
  "Instant lead response",
  "Appointment booking",
  "Missed-call recovery",
  "AI chat & website assistants",
  "CRM automation",
  "Follow-up systems",
  "Review & reputation automation",
  "Email · SMS · WhatsApp workflows",
  "Website conversion optimisation",
  "Marketing automation",
  "Business process automation",
  "AI-powered customer journeys",
] as const;

export const websites = {
  eyebrow: "Websites",
  headline: "Websites that turn visitors into booked jobs.",
  intro:
    "A fast, mobile-first website built for UK small businesses, especially independent garages and MOT centres. It’s designed so customers can find you on Google, call you in one tap and send a booking request in under a minute.",
  features: [
    { title: "Mobile-first", body: "built for the phone your customers are holding" },
    { title: "Tap-to-call and WhatsApp", body: "buttons on every page" },
    { title: "Booking request form", body: "service, vehicle reg or details, preferred date, sent straight to your inbox" },
    { title: "Google-ready", body: "proper page titles, local SEO basics and help setting up your Google Business Profile" },
    { title: "Fast", body: "lightweight pages that load quickly on mobile data" },
  ],
  offer: {
    label: "Founding-client offer · first 3 clients",
    price: "£495",
    priceNote: "for your website",
    standard: "Standard price £795–£1,495",
    terms: [
      { title: "Nothing upfront", body: "50% when you approve the design, 50% at go-live." },
      {
        title: "Free concept homepage first",
        body: "I’ll design your new homepage before you commit to anything. If you don’t like it, you pay nothing.",
      },
    ],
  },
  cta: "Get my free concept homepage",
  ctaMessage: "Website: free concept homepage",
  smallPrint: "Founding price limited to 3 clients. Prices are fixed and agreed in writing before work starts.",
};

export const solutions = [
  {
    key: "capture",
    title: "Capture",
    line: "Capture every opportunity.",
    body: "Calls, web forms, WhatsApp, DMs and ad leads land in one place, so nothing slips through while you’re working.",
    tools: ["Conversion websites", "Missed-call capture", "Unified inbox"],
  },
  {
    key: "respond",
    title: "Respond",
    line: "Respond instantly with AI.",
    body: "An AI assistant answers questions, shares availability and prices in your tone of voice — day or night.",
    tools: ["AI chat & website assistants", "WhatsApp & SMS replies"],
  },
  {
    key: "qualify",
    title: "Qualify",
    line: "Identify serious prospects.",
    body: "The right questions sort urgent, high-value enquiries from the rest and route them straight to you.",
    tools: ["Lead qualification", "CRM automation"],
  },
  {
    key: "follow",
    title: "Follow up",
    line: "Automatically follow up.",
    body: "Quotes, quiet leads and no-shows get timely, human-sounding follow-ups by email, SMS or WhatsApp.",
    tools: ["Follow-up sequences", "Email · SMS · WhatsApp workflows"],
  },
  {
    key: "book",
    title: "Book",
    line: "Turn conversations into appointments.",
    body: "Live availability and instant booking, with reminders and rebooking that protect your diary.",
    tools: ["Appointment booking", "Reminders & rebooking"],
  },
  {
    key: "convert",
    title: "Convert",
    line: "Turn more opportunities into customers.",
    body: "Conversion-focused pages, offers and nudges at the moments prospects are deciding.",
    tools: ["Website conversion optimisation", "Marketing automation"],
  },
  {
    key: "grow",
    title: "Grow",
    line: "Build a repeatable growth system.",
    body: "Reviews, reactivation and clear reporting that compound month after month.",
    tools: ["Review & reputation automation", "Reactivation", "Reporting"],
  },
] as const;

export const pipeline = [
  { key: "leads", title: "Leads", body: "Calls, forms, WhatsApp, DMs, ads.", meta: "Every channel" },
  { key: "response", title: "AI response", body: "Answered in seconds, in your voice.", meta: "24 / 7" },
  { key: "qualify", title: "Qualification", body: "Need, urgency, budget, fit.", meta: "Scored & routed" },
  { key: "follow", title: "Follow-up", body: "Timely nudges until they decide.", meta: "Multi-channel" },
  { key: "booking", title: "Booking", body: "Straight into real availability.", meta: "Live diary" },
  { key: "customer", title: "Customer", body: "Reminders, reviews, rebooking.", meta: "Retained" },
  { key: "revenue", title: "Revenue", body: "Tracked back to the source.", meta: "Reported" },
] as const;

export const chatDemo = {
  label: "Example conversation · illustrative",
  channel: "Missed call · 19:42 · WhatsApp auto-reply",
  messages: [
    { from: "ai", text: "Hi — sorry we missed your call. I’m the roofing team’s assistant. What can we help with?" },
    { from: "customer", text: "Got a leak over the back bedroom. Can someone look this week?" },
    { from: "ai", text: "We can. Is it leaking now, or only when it rains?" },
    { from: "customer", text: "Only when it rains." },
    { from: "ai", text: "Thanks. I have Thursday 8:30am or Friday 2pm for a site visit. Which suits?" },
    { from: "customer", text: "Thursday please" },
    { from: "ai", text: "Booked for Thursday 8:30am ✓ You’ll get a reminder the day before." },
  ],
} as const;

export type IndustryIcon =
  | "sparkles"
  | "smile"
  | "heart"
  | "scale"
  | "calculator"
  | "house"
  | "droplets"
  | "zap"
  | "car"
  | "dumbbell"
  | "scissors"
  | "utensils"
  | "building"
  | "hammer"
  | "bag"
  | "briefcase";

export const industries: {
  key: string;
  name: string;
  /** Who the industry is, as a phrase: “how it works for dental practices”. */
  audience: string;
  icon: IndustryIcon;
  problem: string;
  flow: string[];
  outcome: string;
}[] = [
  {
    key: "aesthetics",
    name: "Aesthetics & beauty",
    audience: "aesthetics & beauty clinics",
    icon: "sparkles",
    problem: "DMs and after-hours enquiries go cold before anyone replies.",
    flow: ["Instagram or web enquiry", "AI reply with treatments & prices", "Consultation questions", "Booked into the live diary", "Reminders & aftercare follow-up"],
    outcome: "Consultations booked while you’re still treating — without living in your inbox.",
  },
  {
    key: "dental",
    name: "Dental",
    audience: "dental practices",
    icon: "smile",
    problem: "Phones ring out during treatment and new-patient enquiries book elsewhere.",
    flow: ["Missed call", "Instant text-back", "New-patient questions answered", "Appointment booked", "Recall & hygiene reminders"],
    outcome: "New patients captured at the moment they’re ready, with recalls that run themselves.",
  },
  {
    key: "healthcare",
    name: "Private healthcare",
    audience: "private healthcare clinics",
    icon: "heart",
    problem: "Slow replies to self-pay enquiries send patients to faster clinics.",
    flow: ["Web or phone enquiry", "AI explains services & fees", "Triage questions", "Consultation booked", "Pre-visit forms & reminders"],
    outcome: "A faster, calmer first response — and fewer empty appointment slots.",
  },
  {
    key: "solicitors",
    name: "Solicitors",
    audience: "solicitors",
    icon: "scale",
    problem: "Enquiries arrive out of hours, and the first firm to respond usually wins.",
    flow: ["Web or phone enquiry", "Instant acknowledgement", "Matter-type qualification", "Consultation booked", "Follow-up until instructed"],
    outcome: "Every potential client acknowledged quickly, and qualified before a fee-earner spends time.",
  },
  {
    key: "accountants",
    name: "Accountants",
    audience: "accountancy firms",
    icon: "calculator",
    problem: "Busy seasons bury new enquiries and prospects drift away.",
    flow: ["Enquiry", "AI answers service & fee questions", "Qualification: turnover, services", "Discovery call booked", "Onboarding & document chasers"],
    outcome: "Prospects move from enquiry to onboarding without manual chasing.",
  },
  {
    key: "roofing",
    name: "Roofing",
    audience: "roofing companies",
    icon: "house",
    problem: "You’re on a roof when the phone rings — the job goes to whoever answers.",
    flow: ["Missed call", "AI instant response", "Lead qualification", "Site-visit booking", "Automated follow-up"],
    outcome: "More site visits from the calls you’d otherwise miss, and quotes that actually get chased.",
  },
  {
    key: "plumbing",
    name: "Plumbing",
    audience: "plumbers",
    icon: "droplets",
    problem: "Urgent calls come in while your hands are full on another job.",
    flow: ["Missed call", "Instant text-back", "Urgency & postcode check", "Job slot booked", "Review request after the job"],
    outcome: "Urgent work captured and booked, even mid-job.",
  },
  {
    key: "electrical",
    name: "Electrical",
    audience: "electricians",
    icon: "zap",
    problem: "Quote requests pile up, and prospects hire whoever quotes first.",
    flow: ["Web enquiry", "Instant reply with next steps", "Photos & job details collected", "Survey booked", "Quote follow-up sequence"],
    outcome: "Faster quotes and fewer jobs lost to silence.",
  },
  {
    key: "garages",
    name: "Garages & automotive",
    audience: "garages",
    icon: "car",
    problem: "MOT and service reminders rely on memory and paper.",
    flow: ["Due-date trigger or enquiry", "Automated reminder", "Online booking", "Work-approval updates", "Review request"],
    outcome: "A workshop diary that keeps refilling with returning customers.",
  },
  {
    key: "fitness",
    name: "Fitness",
    audience: "gyms & fitness studios",
    icon: "dumbbell",
    problem: "Trial sign-ups don’t show, and members drift away quietly.",
    flow: ["Trial enquiry", "Instant welcome", "Goal questions", "Intro session booked", "Attendance nudges & win-back"],
    outcome: "More trials turned into members, with early warning before they leave.",
  },
  {
    key: "salons",
    name: "Salons",
    audience: "salons",
    icon: "scissors",
    problem: "Cancellations leave gaps, and the phone rings mid-appointment.",
    flow: ["Call, DM or web enquiry", "AI replies with availability", "Booked into the live diary", "Reminders to reduce no-shows", "Rebooking prompts"],
    outcome: "A fuller book and fewer empty chairs.",
  },
  {
    key: "restaurants",
    name: "Restaurants",
    audience: "restaurants",
    icon: "utensils",
    problem: "The phone rings through service while tables sit empty.",
    flow: ["Web, Google or phone enquiry", "Instant booking link", "Table booked", "Confirmation & reminder", "Review request"],
    outcome: "Covers booked without anyone leaving the pass.",
  },
  {
    key: "property",
    name: "Property",
    audience: "property agents",
    icon: "building",
    problem: "Viewing requests stack up across portals and inboxes.",
    flow: ["Portal or web enquiry", "Instant reply", "Buyer or tenant qualification", "Viewing booked", "Post-viewing follow-up"],
    outcome: "Serious applicants booked in; time-wasters filtered out.",
  },
  {
    key: "home",
    name: "Home services",
    audience: "home-services businesses",
    icon: "hammer",
    problem: "Leads from ads and directories wait hours for a reply.",
    flow: ["Lead from ads or directories", "Instant reply", "Job details & postcode check", "Visit booked", "Quote follow-up"],
    outcome: "Ad spend that turns into booked visits, not voicemails.",
  },
  {
    key: "retail",
    name: "Local retail",
    audience: "local shops",
    icon: "bag",
    problem: "Customers ask about stock and opening hours, then buy elsewhere.",
    flow: ["Question via web, WhatsApp or social", "AI answers stock & hours", "Reserve or click-and-collect", "Pickup reminder", "Loyalty & review follow-up"],
    outcome: "Questions answered instantly and turned into visits.",
  },
  {
    key: "professional",
    name: "Professional services",
    audience: "professional-services firms",
    icon: "briefcase",
    problem: "Hours go on enquiries that were never a fit.",
    flow: ["Enquiry", "Instant response", "Fit qualification", "Discovery call booked", "Proposal follow-up"],
    outcome: "Your time spent on qualified conversations.",
  },
];

export const diary = {
  eyebrow: "Interactive demo",
  headline: "Booking, handled.",
  lede: "A working slice of the booking flow we install. Try a slot — the confirmation is exactly what your customer would see, not a “we’ll email you.”",
  business: "Example clinic",
  service: "Hydrafacial · 45 min",
};

export const calculator = {
  label: "Example projection",
  headline: "What missed enquiries could be worth.",
  lede: "Enter your own numbers. This models the enquiries you already know you miss — it’s a projection to size the opportunity, not a promise of revenue.",
  disclaimer: "Illustrative only. Based entirely on the figures you enter; actual results depend on your market, offer and follow-through.",
};

export const scenarios = [
  {
    key: "clinic",
    tab: "Aesthetics clinic",
    business: "A city-centre aesthetics clinic",
    video: "/media/case-aesthetics.mp4",
    poster: "/media/case-aesthetics-poster.jpg",
    problem: "Enquiries arrive from Instagram and Google after hours. By the time someone replies the next morning, many have booked elsewhere.",
    built: "An AI assistant on the website and Instagram, connected to a live diary.",
    automation: ["Instant reply with treatment info", "Consultation questions", "Booked into real availability", "Reminders & aftercare follow-up"],
    outcome: "Designed so after-hours enquiries are answered and booked the same evening — not the next morning.",
    before: ["9:40pm DM", "No reply until 10am", "Booked with another clinic"],
    after: ["9:40pm DM", "AI replies in seconds", "Consultation booked"],
  },
  {
    key: "roofing",
    tab: "Roofing company",
    business: "A family-run roofing company",
    video: "/media/case-roofing.mp4",
    poster: "/media/case-roofing-poster.jpg",
    problem: "Calls come in while the team is up on a roof. Quotes go out, then nobody has time to follow up.",
    built: "Missed-call text-back, a qualification flow and automated quote follow-up.",
    automation: ["Missed call → instant text", "Job details & photos collected", "Site visit booked", "Quote follow-up sequence"],
    outcome: "Designed so every missed call becomes a conversation, and every quote gets chased.",
    before: ["Missed call", "Voicemail", "Next roofer answers"],
    after: ["Missed call", "Instant text-back", "Site visit booked"],
  },
  {
    key: "restaurant",
    tab: "Restaurant",
    business: "An independent restaurant",
    video: "/media/case-coffee.mp4",
    poster: "/media/case-coffee-poster.jpg",
    problem: "The phone rings through service, bookings get missed, and no-shows leave tables empty.",
    built: "Online booking from the website and Google, with confirmations and reminders.",
    automation: ["Booking link from web & Google", "Instant confirmation", "Reminder before the visit", "Review request afterwards"],
    outcome: "Designed to fill tables without anyone leaving the pass, with reminders to cut no-shows.",
    before: ["Phone rings in service", "Call missed", "Empty table at 7pm"],
    after: ["Books online", "Confirmed & reminded", "Table filled"],
  },
] as const;

// One place for the monthly prices. null = not yet confirmed by the owner: the card shows
// "Quoted after your free audit" instead of a number. Set a string like "£349" to publish a price.
export const monthlyPrices: Record<"foundation" | "growth" | "scale", string | null> = {
  foundation: "£199",
  growth: null,
  scale: null,
};

export const plans = [
  {
    name: "Foundation",
    tagline: "For businesses starting their AI journey.",
    price: monthlyPrices.foundation,
    cadence: "/month",
    setup: "+ £350 one-time setup",
    value: "Protect the revenue already in your diary — reminders, rebooking and reporting on autopilot.",
    fit: "Typically 10–20 appointments a week",
    featured: false,
    items: [
      "Automated appointment reminders (SMS / WhatsApp)",
      "Cancellation rebooking automation",
      "Monthly performance reports",
      "Email support",
      "Works with any booking system",
    ],
  },
  {
    name: "Growth",
    tagline: "For businesses that want automated lead capture, follow-up and booking.",
    price: monthlyPrices.growth,
    cadence: "/month",
    setup: "+ £500 one-time setup",
    value: "Answer every enquiry instantly and turn more of them into booked appointments.",
    fit: "Typically 30–60 appointments a week",
    featured: true,
    items: [
      "Everything in Foundation",
      "Automated enquiry responses",
      "Instant booking conversion",
      "Customer segmentation",
      "Weekly performance reports",
      "Phone + email support",
    ],
  },
  {
    name: "Scale",
    tagline: "For businesses that want a complete AI growth infrastructure.",
    price: monthlyPrices.scale,
    cadence: "/month",
    setup: "+ £1,200 setup + £299 ad optimisation",
    value: "Demand generation, conversion and retention running as one connected system.",
    fit: "Typically 60+ appointments a week",
    featured: false,
    items: [
      "Everything in Foundation & Growth",
      "Ad strategy & optimisation",
      "Funnel setup & management",
      "Dedicated account manager",
      "Quarterly strategy reviews",
      "24-hour response time",
    ],
  },
] as const;

export const pricingNote =
  "No long-term contracts. Month-to-month billing, with a 7-day money-back guarantee on your setup fee.";

export const faqs = [
  {
    q: "What does DIGIT AI actually do?",
    a: "We design and run automated growth systems: capturing enquiries from every channel, replying instantly with AI, qualifying, following up and booking — then reporting on exactly what the system produced.",
  },
  {
    q: "Is this just a chatbot?",
    a: "No. An AI assistant is one part of it. The value is the whole system — capture, instant response, follow-up, booking, reminders and reviews working together and connected to the tools you already use.",
  },
  {
    q: "How long does setup take?",
    a: "Foundation and Growth: 24–48 hours. We handle everything — you approve and we launch. Scale (with ads): 3–5 days including ad funnel setup.",
  },
  {
    q: "Do I need technical knowledge?",
    a: "No. We do all the setup. Your team just uses it normally. We provide training and ongoing support.",
  },
  {
    q: "Does it work with my booking system?",
    a: "Yes. We integrate with Setmore, Fresha, Acuity, Google Calendar and most booking systems. If yours isn’t on the list, we can usually make it work.",
  },
  {
    q: "Do you guarantee results?",
    a: "No — and be wary of anyone who does. Results depend on your market, offer and follow-through. What we do guarantee is transparency: you’ll see exactly how many enquiries were captured, answered, followed up and booked.",
  },
  {
    q: "What if it doesn’t work for us?",
    a: "There’s a 7-day money-back guarantee on your setup fee. If you’re not happy, we refund it. No questions asked.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No long-term contracts — month-to-month billing. Cancel after month one if it isn’t working for you.",
  },
  {
    q: "How will I know if it’s working?",
    a: "Monthly reports on Foundation, weekly reports on Growth, and monthly deep-dive reviews on Scale. You’ll see exact numbers: enquiries captured, conversations handled, appointments booked and saved.",
  },
  {
    q: "Can I just message you on WhatsApp?",
    a: "Yes — WhatsApp is the fastest way to reach us: +44 7405 286985. Send a message any time and we’ll reply with a time for your growth audit.",
  },
  {
    q: "What happens on a growth audit?",
    a: "A short call where we map where your enquiries come from, where they leak, and which automations would make the biggest difference. If we’re not the right fit, we’ll tell you.",
  },
] as const;

export const cta = {
  eyebrow: "Growth audit",
  headline: "Ready to build your growth system?",
  lede: "We’ll map where your enquiries leak today and what an automated system would change — in plain English, in one short call.",
};

export const footer = {
  note: "DIGIT AI builds intelligent growth systems for UK businesses — capturing opportunities, automating follow-up and turning more conversations into revenue.",
};

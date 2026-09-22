export const site = {
  name: "DIGIT",
  legal: "DIGIT AI",
  tag: "UK conversion studio",
};

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#diary", label: "Live diary" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

export const hero = {
  eyebrow: "For UK salons, trades & hospitality",
  headline: "They're booking your competitor.",
  lede: "The enquiry came in at 7.14pm. You were on the tools. By morning they'd already booked the salon two streets over. DIGIT builds the site, the live diary, and the follow-up that answers in seconds — so the job lands with you.",
  primary: "Book a 20-minute call",
  secondary: "See the live diary",
};

export const stats = [
  { value: 40, prefix: "+", suffix: "%", label: "booked jobs" },
  { value: 2500, prefix: "£", suffix: "", label: "extra work, month one" },
  { value: 2, prefix: "", suffix: " hrs", label: "saved every day" },
  { value: 14, prefix: "", suffix: "-day", label: "typical build" },
] as const;

export const cases = [
  {
    id: "aesthetics",
    client: "Aesthetics Beyond UK",
    sector: "Clinic · Manchester",
    title: "After-hours enquiries used to die in the inbox.",
    body: "Consultations now book themselves from Instagram, Google, and the site. The diary holds real chair time. Nobody is chasing DMs at 10pm.",
    stats: [
      { value: 40, prefix: "+", suffix: "%", label: "booked consultations" },
      { value: 0, prefix: "", suffix: "", label: "missed after-hours leads" },
      { value: 8, prefix: "", suffix: " wks", label: "to first lift" },
    ],
    video: "/media/case-aesthetics.mp4",
    poster: "/media/case-aesthetics-poster.jpg",
  },
  {
    id: "roofing",
    client: "Premium Roofing Services",
    sector: "Trade · Surrey",
    title: "Quotes sat for five days. The work went elsewhere.",
    body: "A live diary on the site, missed-call text-back, and a page that actually says what a new roof costs. The first month paid for the build.",
    stats: [
      { value: 2500, prefix: "£", suffix: "", label: "extra work, month one" },
      { value: 2, prefix: "", suffix: " hrs", label: "quote-to-job, from 5 days" },
      { value: 94, prefix: "", suffix: "%", label: "enquiries answered in 3 min" },
    ],
    video: "/media/case-roofing.mp4",
    poster: "/media/case-roofing-poster.jpg",
  },
  {
    id: "coffee",
    client: "Downtown Coffee & Bistro",
    sector: "Hospitality · Leeds",
    title: "The phone rang through service. Tables sat empty at 7.",
    body: "Covers now book from the site and Google. Evenings fill without the owner leaving the pass. No-shows dropped because a reminder actually goes out.",
    stats: [
      { value: 2, prefix: "", suffix: " hrs", label: "saved on bookings, every day" },
      { value: 28, prefix: "+", suffix: "%", label: "evening covers" },
      { value: 4, prefix: "", suffix: "%", label: "no-show rate, from 18%" },
    ],
    video: "/media/case-coffee.mp4",
    poster: "/media/case-coffee-poster.jpg",
  },
] as const;

export const services = [
  {
    n: "01",
    title: "Conversion websites",
    body: "A site that answers the three questions before they book: can you do it, when, and what does it cost. Built to load fast on a wet high street with one bar of signal.",
  },
  {
    n: "02",
    title: "Live diary",
    body: "Your real availability, on the site. No “email us for a slot.” They pick a time. It’s in the book. Cancellations free the chair automatically.",
  },
  {
    n: "03",
    title: "Instant capture",
    body: "Web, WhatsApp, missed-call text. Every enquiry answered in under a minute — even at 9pm — with a hold on a real slot, not a “we’ll call you back.”",
  },
  {
    n: "04",
    title: "Local search",
    body: "Google Business, maps, and the pages that rank for “roofer near me” and “facial in [town].” Written like a local, structured like a machine.",
  },
  {
    n: "05",
    title: "Review engine",
    body: "The right ask, at the right moment. A page of five-star proof instead of three forgotten ones from 2019.",
  },
  {
    n: "06",
    title: "Always-on follow-up",
    body: "The quote that didn’t close. The client who went quiet. Brought back without you chasing, on a cadence that doesn’t feel like spam.",
  },
] as const;

export const why = [
  "Two build slots a month. That’s the point — we don’t scale by rushing.",
  "Owner-operators only. If you already have a marketing department, we’re not for you.",
  "UK studio. You speak to the person who designed the thing, not a portal.",
  "Live in 14 days, not 14 weeks of moodboards.",
  "You own every login. We are not a platform that holds your leads hostage.",
  "We prove the diary on your real hours before we talk about brand.",
] as const;

export const testimonials = [
  {
    quote:
      "We used to lose Friday-night Botox enquiries to whoever answered first. Now the diary fills while I’m still treating. Forty percent more consultations, and I didn’t hire a receptionist.",
    name: "Amira Khan",
    role: "Founder, Aesthetics Beyond UK",
  },
  {
    quote:
      "I’d quote a roof, then spend three days playing phone tag. The first month we put the diary live we booked two extra jobs — about two and a half grand — that would have gone to the next van on Checkatrade.",
    name: "Dan Hargreaves",
    role: "Owner, Premium Roofing Services",
  },
  {
    quote:
      "Saturday lunch used to mean the phone glued to my ear and two tables sitting empty. Two hours back, every day. Evenings are booked before the board goes up.",
    name: "Elena Rossi",
    role: "Owner, Downtown Coffee & Bistro",
  },
] as const;

export const plans = [
  {
    name: "Site",
    price: "£1,950",
    cadence: "one-off",
    blurb: "The front door. Fast, clear, built to convert on a phone.",
    featured: false,
    items: [
      "Conversion homepage + four inner pages",
      "Mobile-first, Core Web Vitals in the green",
      "Enquiry form and click-to-call",
      "Google Business polish",
      "14-day build",
    ],
  },
  {
    name: "Site + Diary",
    price: "£3,450",
    cadence: "one-off",
    blurb: "They pick a time. It’s in the book. This is the one most owners choose.",
    featured: true,
    items: [
      "Everything in Site",
      "Live diary on the site, your real hours",
      "Instant capture — web and missed-call text",
      "Review ask after every job",
      "30 days of tuning after launch",
    ],
  },
  {
    name: "Growth",
    price: "£4,950",
    cadence: "one-off, first month of ads in",
    blurb: "The full stack: site, diary, and paid demand that doesn’t leak.",
    featured: false,
    items: [
      "Everything in Site + Diary",
      "Google or Meta, set up and first month managed",
      "Monthly review for 90 days",
      "Priority slot for copy and page changes",
      "Hold on the next two change windows",
    ],
  },
] as const;

export const faqs = [
  {
    q: "How long does a build take?",
    a: "Fourteen days from the kickoff call, provided we have your hours, services, and a handful of photos. The diary is live on day ten so you can test it on real enquiries before we call it done.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. You send us the hours, the price list, and who you want to attract. We do the rest. After launch you get a 20-minute walkthrough — then you can ignore the admin if you like.",
  },
  {
    q: "What if I already have a website?",
    a: "Most of our work is replacing sites that look fine and convert poorly. We migrate what still earns its place and throw out the rest. You keep the domain.",
  },
  {
    q: "Do you lock me into a monthly fee?",
    a: "No. Site and Site + Diary are one-off. Hosting is yours. If you want us on the line after 30 days that’s a separate, cancellable retainer — never a condition of keeping the diary.",
  },
  {
    q: "Who is this not for?",
    a: "National chains, marketplaces, and anyone whose idea of a website is a brochure. We work with owner-run salons, clinics, trades, and hospitality in the UK — people who still pick up the phone.",
  },
  {
    q: "What happens on the call?",
    a: "Twenty minutes. We look at where enquiries die, whether a diary would actually fill, and if we have a slot this month. If we’re not a fit, we’ll say so in the first five minutes.",
  },
] as const;

export const cta = {
  eyebrow: "September",
  headline: "Two build slots left this month.",
  lede: "We take two builds at a time so the diary is live in 14 days, not queued behind a dozen other sites. If you want in, the next call is 20 minutes.",
  button: "Claim a slot",
};

export const footer = {
  note: "DIGIT AI is a UK conversion studio. We build the site, the live diary, and the follow-up for salons, trades, and hospitality.",
  email: "hello@digitai.uk",
};

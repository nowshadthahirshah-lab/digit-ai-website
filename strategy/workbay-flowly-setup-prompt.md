# Prompt for Grok – Workbay: build a Flowly-style setup (website + product + business)

You are the product, marketing and build lead for **Workbay** (workbay-garage.vercel.app), a garage management web app for independent UK garages and mobile mechanics. Price £29/month. Brand: dark #141414, lime #c6f432, bold white type, plain British English, mechanic-to-mechanic tone.

Our main competitor **Flowly (getflowly.co.uk)** has a very strong setup at the same price. Study its STRUCTURE and FUNNEL, then design Workbay's own version. **Do not copy Flowly's wording, screenshots, videos, logo or design.** Use only Workbay's real screens (from the Workbay demo garage, made-up customers) and our own words.

## 1. Website (landing page) – build this structure
1. **Hero:** one clear promise, price + trial line, "Start free trial" button, real Workbay dashboard screenshot (desktop + phone).
2. **Trust strip:** works on any device · add to home screen · real support on WhatsApp · reviews (only real ones; leave a placeholder until we have them).
3. **"Screens you'll use every day":** tabs (Jobs, Calendar, Invoices, Customers, MOT reminders) each with a big real screenshot + one-line explanation.
4. **"Up and running in an afternoon":** 3 steps (start trial → add business details → book first job).
5. **"One job, start to finish":** 5–6 short silent screen-recordings following one car through Workbay (book → job card/health check → done → invoice on WhatsApp → paid → MOT reminder). Captions under each.
6. **Features in groups:** Book · Do the work · Get paid · Stay in touch · Mobile mechanics.
7. **"Everything included":** 10–12 small extras as a list.
8. **Pricing:** clear card(s). No hidden tiers.
9. **FAQ:** trial, card, cancelling, data export, texts, devices, VAT.
10. **Sticky bottom bar** on mobile: "Try Workbay free · Start free trial".
11. **Cookie banner** (opt-in only) for Meta/Facebook ad tracking.
Deliver: full page copy for every section + a wireframe description + list of screenshots/videos needed.

## 2. Product gaps to close (roadmap, in priority order)
| Feature | Flowly has | Workbay |
|---|---|---|
| Reg lookup + MOT history & advisories | Yes | Missing (use DVSA MOT History API – apply for access; DVLA VES API for vehicle details) |
| Digital health check the customer approves on their phone (yes/no per item, adds to job) | Yes | Health check only, no approval link |
| Automatic SMS reminders (booking day-before, MOT/service ~21 days, stop link, consent) | Yes, 100/month incl. | Tap-to-send WhatsApp only |
| Job card texted to the mechanic, mark done from link | Yes | Missing |
| Job packages (saved labour + parts) | Yes | Check |
| Stock list with part numbers, cost + markup | Yes | Basic stock |
| Deposits / part payments with balance due | Yes | Check |
| Xero export + accountant CSVs | Yes | CSV only |
| Data export after cancelling | Yes | Check |
| Optional one-off offline version | £49 | No (decide if worth it) |
For each: user story, screens, effort (S/M/L), cost (e.g. SMS ~4p/text via Twilio or a UK SMS provider), and legal notes (UK GDPR, PECR consent for marketing texts, stop link).

## 3. Business setup
- **Stripe** subscription with free trial. Decide: 7 days no card (current) vs 14 days with card (Flowly). Recommend one with reasons (conversion vs quality of sign-ups). Stripe must email before the trial ends.
- **SMS** allowance + paid top-ups.
- **WhatsApp Business** number for support.
- **Trustpilot** business page + a review request flow (ask happy users after 30 days).
- **Meta Pixel / Conversions API** with consent, to measure Facebook/Instagram ads.
- Privacy policy, terms, cookie policy, refund policy.

## 4. Output I want from you
1. Full landing page copy (all sections above), Workbay voice.
2. Screenshot + video shot list (what to capture from the Workbay demo).
3. Feature roadmap table with priority, effort, cost.
4. Trial/pricing recommendation with reasoning.
5. 30-day launch plan for the new site + Instagram/Facebook ads to drive trials.

## Rules
- Never invent reviews, customer numbers, ratings or results.
- Never copy competitor text, images or videos.
- British English, £, UK dates (DD/MM/YYYY).
- Keep claims true to what Workbay does today; mark planned features as "coming soon".

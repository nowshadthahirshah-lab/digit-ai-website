# Alif (Grok CEO bot): Workbay to-do list

Alif handles the accounts and settings Claude can't reach: Vercel, Supabase, Stripe.
Updated: 25/11/2026

## Waiting on Alif (in this order)

1. **Link Vercel to GitHub.** Project → Settings → Git → connect `nowshadthahirshah-lab/workbay`, production branch `main`. After that, every merge to `main` goes live by itself.
2. **Move the Stripe webhook secret.** Add `STRIPE_WEBHOOK_SECRET` to Supabase → Edge Functions → Secrets, take it out of the code, then redeploy `stripe-webhook`. Don't redeploy before the secret is set.
3. **Trial = exactly 7 days.** Remove the duplicate trial in Stripe so customers get 7 days, not about 14. Card still required.
4. **Check the Round 1 preview.** Open the Vercel preview for branch `round-1` and confirm it loads. Don't merge to `main` until the owner says go.
5. **Round 2 preview.** Branch `round-2` (built on `round-1`) adds customer health-check approval. It needs no database. Check its Vercel preview too.
6. **Test database for the rest of Round 2 (later).** Create a separate free Supabase project for testing (never the live one), and share only its URL and anon key. This is needed for the mechanic link and online booking.

7. **Apply for UK vehicle data APIs (both free).** Full prompt below under "Vehicle data API applications". Keys go only into Supabase Edge Function secrets, never into chat, GitHub or the app code.

## Rules for Alif
- Never share secret keys in chat (service_role, Stripe secret, webhook secret).
- Don't touch live Stripe products/prices without the owner's OK. The Stripe account is shared with other businesses.
- Change Stripe IDs in the app and the webhook together, or not at all.
- Never give the app write access to the `subscriptions` table.

## Done
- Created the private repo `nowshadthahirshah-lab/workbay` matching the live site (handover in `docs/HANDOVER.md`).

## Message to paste to Alif
> 1. Link the Vercel project to GitHub repo nowshadthahirshah-lab/workbay (production branch: main).
> 2. Add STRIPE_WEBHOOK_SECRET to Supabase Edge Function secrets and remove it from the code, then redeploy stripe-webhook.
> 3. Make the Stripe trial exactly 7 days (remove the duplicate trial so it's not ~14).
> 4. Open the Vercel preview for branch round-1 and confirm it loads. Don't merge to main until I say.


## Vehicle data API applications (prompt for Alif)

> Alif, please apply for two free UK government vehicle data APIs for Workbay, our garage management app for independent UK garages. Use the Workbay business name, business email and business postal address (not anyone's personal email).
>
> **1. DVLA Vehicle Enquiry Service (VES) API**
> - Apply here: https://register-for-ves.driver-vehicle-licensing.api.gov.uk/
> - Docs: https://developer-portal.driver-vehicle-licensing.api.gov.uk/
> - What we use it for: when a garage types a customer's number plate, Workbay fills in the make, colour, fuel type, year, and MOT and tax due dates, so the job is booked in faster and MOT reminders are accurate.
> - Expected volume: low. About 20 to 50 look-ups per garage per day, a few thousand a day at most as we grow. Look-ups are only made when a garage user enters a plate, and results are cached for 24 hours.
> - If they offer a test (UAT) key as well as a live key, ask for both.
>
> **2. DVSA MOT History API (the new version; the old one was switched off on 1 September 2025)**
> - Register here: https://documentation.history.mot.api.gov.uk/mot-history-api/register
> - Docs: https://documentation.history.mot.api.gov.uk/
> - What we use it for: showing the garage a vehicle's MOT history (advisories, failures, recorded mileage) when it's booked in, and a daily check of MOT expiry dates for vehicles in each garage's own customer list, so reminders are sent at the right time.
> - Expected volume: as above. The daily MOT check runs once a night, only for vehicles the garage already has on file.
> - DVSA will send a client ID, client secret, scope, token URL and an API key. Note the client secret expires every 2 years, so put a renewal reminder in the calendar.
>
> **When the keys arrive**
> - Do NOT paste any key, secret or ID into chat, email to me, GitHub or the app code.
> - Store them as Supabase Edge Function secrets with these names:
>   `DVLA_VES_API_KEY`, `DVSA_MOT_CLIENT_ID`, `DVSA_MOT_CLIENT_SECRET`, `DVSA_MOT_SCOPE`, `DVSA_MOT_TOKEN_URL`, `DVSA_MOT_API_KEY`
> - Put them in the separate test Supabase project first (the one for Round 2 testing). Only add them to the live project when I say go.
> - Then tell me: which APIs were approved, the date, any usage limits or terms they set, and when the DVSA client secret expires.
>
> **Terms to respect** (tell me if their terms say anything different): show the data only to the garage that looked it up, don't resell or bulk-download it, and credit "Contains public sector information from DVLA/DVSA" where they ask.

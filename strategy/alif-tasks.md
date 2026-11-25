# Alif (Grok CEO bot): Workbay to-do list

Alif handles the accounts and settings Claude can't reach: Vercel, Supabase, Stripe.
Updated: 25/11/2026

## Waiting on Alif (in this order)

1. **Link Vercel to GitHub.** Project → Settings → Git → connect `nowshadthahirshah-lab/workbay`, production branch `main`. After that, every merge to `main` goes live by itself.
2. **Move the Stripe webhook secret.** Add `STRIPE_WEBHOOK_SECRET` to Supabase → Edge Functions → Secrets, take it out of the code, then redeploy `stripe-webhook`. Don't redeploy before the secret is set.
3. **Trial = exactly 7 days.** Remove the duplicate trial in Stripe so customers get 7 days, not about 14. Card still required.
4. **Check the Round 1 preview.** Open the Vercel preview for branch `round-1` and confirm it loads. Don't merge to `main` until the owner says go.
5. **Test database for Round 2 (later).** Create a separate free Supabase project for testing (never the live one), and share only its URL and anon key. This is needed for live online approvals, the mechanic link and online booking.

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

# Workbay Instagram carousel – reusable prompt

Do NOT generate images. Use real app screenshots only.

1. Open https://workbay-garage.vercel.app/app/ with Playwright at iPhone size
   (390×844, deviceScaleFactor 3, locale en-GB, timezone Europe/London).
   Tap "Try the demo" (local demo data, fictional UK customers – no real data).
   In More → Settings, set the garage name to "Hillside Motors".
2. Screenshot: Home (dashboard), Jobs (job list), a job card (LR19 TKE),
   its invoice ("Invoice · share, print or send"), More → MOT and service
   reminders, Customers. Also a 1440×900 desktop screenshot of Home.
   Make sure no toast (e.g. "Saved") is visible.
3. Build a 7-slide carousel, 1080×1350 PNG, HTML/CSS rendered with Playwright:
   - Background #141414, font Inter 800
   - Small "WORKBAY" tag top-left (lime square + letter-spaced text), slide
     number "n/7" top-right
   - Bold white headline (84px) above, one keyword in lime #c6f432,
     a short grey subline (34px) below it
   - Screenshot inside a clean dark phone frame (rounded body, camera pill,
     no logos), with ~54px status-bar gap so the camera never covers app text
   - Soft lime glow behind the phone; keep text 80px+ from edges

| # | Headline (lime word) | Subline | Visual |
|---|---|---|---|
| 1 | Your whole garage. **One app.** | Jobs, invoices, MOTs and customers. | Phone: dashboard |
| 2 | Every **job** in one list | Booked, in progress, done, paid. | Phone: job list |
| 3 | **Invoices** in 30 seconds | Share as a PDF or send on WhatsApp. | Phone: invoice |
| 4 | MOT **reminders** sent for you | The message is written. One tap to send. | Phone: MOT reminders |
| 5 | All your **customers**, sorted | Every name, number and reg in one place. | Phone: customer list |
| 6 | Works on your **phone** or garage computer | Same garage, any screen. Nothing to install. | Monitor (desktop shot) + phone overlapping |
| 7 | **7 days free.** No card. | Link in bio @work_bayapp | Phone right, lime "Start free trial" pill bottom-left |

4. QA every slide: no text cut off, readable on a phone, no overlaps,
   no fake-looking UI, no typos. Output PNGs to /slides.

## Caption
Paper diary, WhatsApp threads, a spreadsheet you update on Sunday night. Sound familiar?

Workbay puts your whole garage in one app:
→ Every job on one board, from booked to paid
→ Itemised invoices sent as a PDF or on WhatsApp
→ MOT and service reminders written for you, one tap to send
→ Every customer, number and reg in one place
→ Works on your phone in the workshop or the computer in the office

7 days free. No card needed. Link in bio @work_bayapp

What's the one job you'd love to stop doing by hand?

#independentgarage #ukgarage #mechaniclife #motuk #garagelife #ukmechanic

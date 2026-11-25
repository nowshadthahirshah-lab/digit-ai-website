# Workbay website upgrade (ready to deploy)

Upgraded copy of the live site at https://workbay-garage.vercel.app (home page `index.html`).

Added (all on the home view, existing sections kept as they were):
- Trust strip under the hero (devices, home screen, no contract, data export)
- "Open the app. See your whole garage.": the dashboard, with a phone that scrolls to each part (who to chase, this month, to do, today)
- "The screens you'll use every day": tabbed real app screenshots + desktop view
- "One job, start to finish": 4 real screen recordings from the demo garage (media/walk-*.mp4)
- "Up and running before your next brew": 3 setup steps
- Sticky "7 days free · Try it free" bar on phones

To deploy: copy `index.html` and the `media/` folder into the root of the Workbay repo (next to `app/`), then push.
`upgrade-inject.py` re-applies the additions to a fresh copy of the original index.html.

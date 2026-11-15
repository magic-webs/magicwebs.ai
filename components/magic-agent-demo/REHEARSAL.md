# Magic Agent demo: rehearsal notes

**Gold copied:** `device-pair`, with WhatsApp bubbles adapted from `messages` and `telegram`. The layout is corner bleed with the phone as the satellite. The phone straddles the window's left edge, over the sidebar only.

**Story (plays once, when scrolled into view):** the agent asks the missing question. The customer replies, and Print and Needed by roll into the enquiry. The agent answers from the delivery policy, Lead time fills, and the status rolls from Collecting to Ready to price while Send quote turns primary. About 9s of beats, then a 3s hold. Reduced motion shows the finished frame (the `poster`).

**Changed from the gold:** the phone runs a WhatsApp chat instead of a lock screen. The phone sits left so cause reads before effect. The ground is the platform's teal swatch (#c3d3ce), the accent is deep teal, and the type is the site's Inclusive Sans. The business is fictional (Inkwell Prints) and shows WhatsApp's default picture, not an invented logo.

**Compact (below 640px wide, 358×600):** a different composition, not a squeeze. The phone is 296 wide. The enquiry card (without the button) straddles the phone's right edge by 30px. The thread uses WhatsApp's larger text setting, so labels stay above 10px.

**Checked**
- Stills at 1040 and 390, in the playground and on the real pages (`/platforms/magic-agent`, `/`). Framing lines are clear.
- The playground loop with `--gate` ends `rehearsal passed`.
- Site typecheck is clean. ESLint is clean on the demo and the pages.

**Not checked / open**
- Motion sampling on this machine ran at 83–111ms, so film reports `inconclusive`: short motion (the bubble rise, the Roll) was not judged frame by frame. Watch it at full speed in a browser.
- On the site, `--gate` reports 6 `kit override` lines. They are false positives: film skips stylesheets whose URL contains `/kit/`, and Next bundles the kit's CSS into `/_next/` chunks. All six selectors are the kit's own phone rules; the playground run had none.
- Not tested: dark mode (the site is light only), touch devices, Safari, or leaving and re-entering the viewport mid-play.

The kit in `components/stageshow/kit` is vendored from the Stageshow skill (MIT, `../LICENSE`) and excluded from ESLint.

# Magic Reward demo: rehearsal notes

**Gold copied:** `device-pair`, laid out like the Magic Agent demo. The phone is on the left, over the dashboard's sidebar, so cause reads before effect.

**Story (plays once, when scrolled into view):**
1. The customer's details are already in, and a finger taps Spin.
2. The wheel spins for 4.4s and slows onto 20% off, a few degrees into the segment.
3. The heading rolls to "You won 20% off", the other segments dim, and the button becomes Claim reward.
4. Ananya Iyer's row drops in at the top of Live plays. Plays today rolls from 128 to 129, and Prizes won from 41 to 42.
5. It holds for about 3s. Reduced motion shows the finished frame.

**Layout:**
- **Wide:** 1040×540.
- **Compact (358×600, below 640px):** the phone with a smaller wheel, so Spin and Claim stay clear. A slim card straddles the phone's lower right edge, holding Plays today on one line plus the new row and one older row. Small labels are set above 10px at the phone's 0.69 scale.
- **Look:** sage ground, forest and cream wheel art, the site's font. The café is fictional (Chai Junction), shown as a plain wordmark.

**Checked**
- Stills at 1040 and 390 report no issues.
- `--gate` ends `rehearsal passed` at both widths, in the playground.

**Not checked / open**
- The `jump` lines during the spin are the rotating wheel's boxes moving between sparse frames, not a fault.
- Sampling on this machine is too sparse to judge short motion (`inconclusive`).
- Untested in Safari and on touch devices.
- The wheel's labels draw at about 9px in compact. They're art on the wheel, not reading text.

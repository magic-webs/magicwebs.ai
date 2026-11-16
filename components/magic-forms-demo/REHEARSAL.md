# Magic Forms demo: rehearsal notes

**Gold copied:** `hero-demo` (a cursor story in one window) and `overlap` / `static-card` for the satellite. Wide uses corner bleed: the builder is pinned top-left and runs off the bottom, with a Submissions card straddling its right edge over empty canvas.

**Story (plays once, when scrolled into view):**
1. The cursor clicks Choice in the field palette, and a Company size field drops into the form, selected.
2. The cursor clicks Share, and the same button turns into "Link copied".
3. A submission from Ananya Rao drops into Submissions, and the count rolls from 128 to 129.
4. The `submission.created · 200` webhook delivery opens under it.

About 7s of beats, then a 3s hold. Reduced motion shows the finished frame (the `poster`).

**Look:** a sand ground (#d6d0c3, the platform's swatch), a neutral ink accent, shadcn-like controls and the site's Inclusive Sans. The form and the person are fictional.

**Compact (below 640px wide, 358×590):** a different composition. With no desktop window or palette, the builder becomes one panel bleeding off the foot: a bar with Share, the form (the field is added from its own Add field), then Submissions, whose older rows run past the stage. The webhook line sits under the card's header so it stays in view.

**Checked**
- Poster stills at 1040 and 390 report no issues.
- Playground loops with `--gate` end `rehearsal passed` at both widths.
- Site `tsc` is clean, and so is ESLint on this folder.

**Not checked / open**
- Sampling on this machine was too sparse (`inconclusive`), so short motions were not judged frame by frame. Watch it at full speed.
- Remaining candidates, judged intentional:
  - `lopsided` on the hovered palette row: a nav row is left-aligned by design.
  - A 2px `jump` on the Share label crossfade: this happens inside the kit's Button.
  - `appears with no entrance` on the Count strip at mount.
- Not filmed in the host pages (they don't render it yet), and not tested in Safari or on touch.

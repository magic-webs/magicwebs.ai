# Magic Native UI demo: rehearsal notes

**Gold copied:** `device-pair` for the layout (a window pinned top-left and off the bottom, a phone straddling its right edge). The terminal comes from the kit's `chrome="terminal"`, as in `hero-demo`. I dropped the web build from the brief to keep two devices and one cause.

**Story (plays once, when scrolled into view):** the history shows `npx magic-native-ui init` already run. The command `npx magic-native-ui add dialog` types in, and the CLI reports line by line: `✓ Checking registry.`, `✓ Installing dependencies.`, `✓ Created 1 file:`, `- components/ui/dialog.tsx`. The same "Delete project?" dialog opens over the Projects screen on an iPhone and then, 80ms later, on a Pixel. A fresh prompt follows, then a 3s hold. Reduced motion shows the finished frame (the `poster`).

**Wide stage (1040×380):** shortened after a review on the real page found a dead dark corner under the terminal's output. The stage is shorter, the terminal type is 14px and the add command prints its full report, so what shows of the terminal is mostly output. Both phones are raised; the dialogs sit at 276pt with their buttons mid-row.

**Look:** a warm grey ground (#cfcdc9, a tint of the platform's swatch), the site's Inclusive Sans for the app UI and the kit's mono for the terminal. The two dialogs share the same component geometry on both phones. The dialog has no shadow of its own; the scrim separates it.

**Compact (below 640px, 358×600):** the iPhone pinned top-left, with a shortened terminal (`~` path, no history, only the last two report lines) straddling its lower right over the list.

**Checked**
- Stills at 1040 and 390 have no framing or never-intentional lines.
- The playground loop with `--gate` ends `rehearsal passed` at both widths.
- The dialog sits so its buttons fall mid-row over the list behind (rows are 55pt apart; the buttons are 99pt down from the dialog's top).

**Not checked / open**
- Motion sampling was sparse on this machine, so film reports `inconclusive`. Watch it at speed.
- Remaining candidate lines: placeholder bars "touching" the dialog, because the list sits beneath the overlay (intentional), and a 7px caret `settle snap` when the trailing prompt opens.
- The coordinator filmed the earlier version on the real page; the current version is filmed only in the playground.

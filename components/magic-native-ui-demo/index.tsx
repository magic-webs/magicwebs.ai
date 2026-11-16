'use client'

import { Bar, Button, Caret, Collapse, Phone, Prompt, Stage, Window, type Act } from '@/components/stageshow/kit'
import './magic-native-ui.css'

// Magic Native UI: one component, added once, on every platform. The CLI
// adds the Dialog to the project; the same Dialog then opens on an iPhone
// and a Pixel, identical on each.
//
// Wide: a device pair on a short stage. The terminal is pinned top-left and
// runs off the bottom, filled with the CLI's real output; the iPhone
// straddles its right edge, and the Pixel stands beside it at the right
// gutter. Reading order is cause (the command) then effect (the same dialog
// on both phones).
// Compact: the iPhone, pinned top-left, with the terminal straddling its
// lower right over the list below the dialog.
//
// Real strings: the command, the file it wrote, the dialog's title, body
// and two buttons, and the screen's title. Everything else is placeholder.

/** out: how many lines of the add command's output have printed (0 to 4). */
type S = { cmd: string; out: number; open: boolean; done: boolean }

const COMMAND = 'npx magic-native-ui add dialog'
const initial: S = { cmd: '', out: 0, open: false, done: false }
const poster: S = { cmd: COMMAND, out: 4, open: true, done: true }

async function script(a: Act<S>) {
  await a.wait(800)
  a.mark('type')
  await a.type('cmd', COMMAND, { interval: 48 })
  await a.wait(450)
  a.mark('run')
  for (let out = 1; out <= 4; out++) {
    await a.set({ out })
    await a.wait(out === 2 ? 650 : 320)
  }
  await a.wait(500)
  a.mark('open')
  await a.set({ open: true })
  await a.wait(900)
  await a.set({ done: true })
  await a.wait(3000)
  a.mark('done')
}

/** The app screen every platform renders: a title over a list, and the Dialog. */
function Screen({ open, kind }: { open: boolean; kind: 'ios' | 'android' }) {
  return (
    <div className="mn-screen" data-kind={kind}>
      <div className="mn-screen__title">Projects</div>
      <div className="mn-list">
        {[112, 86, 128, 98, 120, 92, 116, 80, 124, 102].map((w, i) => (
          <div key={i} className="mn-item">
            <Bar w={30} h={30} r={8} tone={2} />
            <span className="mn-item__lines">
              <Bar w={w} h={8} tone={3} />
              <Bar w={w * 0.6} h={6} tone={2} />
            </span>
          </div>
        ))}
      </div>
      <div className="mn-scrim" data-open={open || undefined} />
      <div className="mn-dialog" role="presentation" data-open={open || undefined}>
        <div className="mn-dialog__title">Delete project?</div>
        <div className="mn-dialog__body">This can’t be undone.</div>
        <div className="mn-dialog__actions">
          <Button className="mn-btn">Cancel</Button>
          <Button variant="primary" className="mn-btn mn-btn--danger">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

function Terminal({ s, compact }: { s: S; compact?: boolean }) {
  const path = compact ? '~' : '~/my-app'
  return (
    <Window chrome="terminal" title="my-app — zsh" className="mn-term">
      {/* Wide, the setup run sits above in the history: the project was
          initialised once, then components are added one at a time */}
      {!compact && (
        <>
          <Prompt path={path}>npx magic-native-ui init</Prompt>
          <div className="dim">✓ Tailwind and components.json ready</div>
        </>
      )}
      <Prompt path={path}>
        <span data-target="cmd" data-typing>{s.cmd}</span>
        {s.out === 0 && <Caret still={s.cmd.length > 0} />}
      </Prompt>
      {/* The CLI's own report, line by line. Narrow, only the result */}
      {!compact && (
        <>
          <Collapse open={s.out >= 1}>
            <div className="ok">✓ Checking registry.</div>
          </Collapse>
          <Collapse open={s.out >= 2}>
            <div className="ok">✓ Installing dependencies.</div>
          </Collapse>
        </>
      )}
      <Collapse open={s.out >= 3}>
        <div className="ok">✓ Created 1 file:</div>
      </Collapse>
      <Collapse open={s.out >= 4}>
        <div className="dim">  - components/ui/dialog.tsx</div>
      </Collapse>
      <Collapse open={s.done}>
        <Prompt path={path}>
          <Caret />
        </Prompt>
      </Collapse>
    </Window>
  )
}

export default function MagicNativeUi() {
  return (
    <Stage<S>
      width={1040}
      height={380}
      compact={{ below: 640, width: 358, height: 600 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      className="mn"
    >
      {(s, _rect, layout) => (
        <>
          {layout === 'wide' && <Terminal s={s} />}
          <Phone width={layout === 'wide' ? 240 : 296} frame="pro" className="mn-phone mn-phone--ios">
            <Screen open={s.open} kind="ios" />
          </Phone>
          {layout === 'wide' && (
            <Phone width={240} frame="android" className="mn-phone mn-phone--android">
              <Screen open={s.open} kind="android" />
            </Phone>
          )}
          {layout === 'compact' && <Terminal s={s} compact />}
        </>
      )}
    </Stage>
  )
}

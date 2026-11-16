'use client'

import { Calendar, Check, CircleDot, Mail, Plus, Star, Type, Upload, Webhook } from 'lucide-react'
import { Avatar, Badge, Bar, Button, Collapse, Count, Row, Stage, Text, Window, type Act } from '@/components/stageshow/kit'
import './magic-forms.css'

// Magic Forms: build it, share one link, collect the answers.
//
// The builder is the hero, pinned top-left and off the bottom; a
// Submissions card straddles its right edge over empty canvas. Three beats:
// the cursor adds a Choice field (Company size) to the form, clicks Share and
// the button turns to Link copied on itself; then a submission arrives in
// the card, the count rolls, and the webhook delivery lands under it.
// Narrow, the palette goes: the field is added from the form's own Add field.
//
// Real strings: the form's name, its title, the field labels and options,
// the palette, the button, the new submission and the webhook event.

type S = { added: boolean; copied: boolean; submitted: boolean; hooked: boolean }
const initial: S = { added: false, copied: false, submitted: false, hooked: false }
const poster: S = { added: true, copied: true, submitted: true, hooked: true }

const REST = { wide: { x: 660, y: 470 }, compact: { x: 236, y: 330 } }

async function script(a: Act<S>) {
  await a.wait(700)
  a.mark('add')
  await a.click(a.layout === 'wide' ? { at: 'choice', x: 0.7, y: 0.5 } : { at: 'add-field', x: 0.75, y: 0.5 })
  await a.set({ added: true })
  await a.wait(1100)
  a.mark('share')
  await a.click({ at: 'share', x: 0.8, y: 0.65 })
  await a.set({ copied: true })
  await a.wait(500)
  await a.move(a.layout === 'wide' ? REST.wide : REST.compact)
  await a.wait(900)
  a.mark('submit')
  await a.set({ submitted: true })
  await a.wait(700)
  await a.set({ hooked: true })
  a.mark('done')
  await a.wait(3000)
}

const PALETTE = [
  { icon: Type, label: 'Short text' },
  { icon: Mail, label: 'Email' },
  { icon: CircleDot, label: 'Choice', target: 'choice' },
  { icon: Star, label: 'Rating' },
  { icon: Calendar, label: 'Date' },
  { icon: Upload, label: 'File upload' },
]

const SIZES = ['1–10', '11–50', '51–200', '200+']

function Input({ w }: { w: number }) {
  return (
    <span className="mf-input">
      <Bar w={w} h={6} tone={2} />
    </span>
  )
}

function FormCard({ s, compact }: { s: S; compact: boolean }) {
  return (
    <div className="mf-form">
      <div className="mf-steps">
        <Text className="mf-steps__label">Step 1 of 3</Text>
        <span className="mf-steps__track">
          <span data-on />
          <span />
          <span />
        </span>
      </div>
      <Text className="mf-form__title">Tell us about your team</Text>
      {!compact && (
        <label className="mf-q">
          <Text className="mf-q__label">Full name</Text>
          <Input w={96} />
        </label>
      )}
      <label className="mf-q">
        <Text className="mf-q__label">Work email</Text>
        <Input w={128} />
      </label>
      <Collapse open={s.added} reveal="drop">
        <div className="mf-q mf-q--new" data-selected={s.added || undefined}>
          <Text className="mf-q__label">Company size</Text>
          <span className="mf-options">
            {SIZES.map((o) => (
              <span key={o} className="mf-option">
                <span className="mf-radio" />
                {o}
              </span>
            ))}
          </span>
        </div>
      </Collapse>
      {compact ? (
        <span className="mf-add" data-target="add-field">
          <Plus size={14} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
          Add field
        </span>
      ) : (
        <div className="mf-form__foot">
          <Button variant="primary" className="mf-next">Next</Button>
        </div>
      )}
    </div>
  )
}

function Hook({ s }: { s: S }) {
  return (
    <Collapse open={s.hooked}>
      <div className="mf-hook">
        <Webhook size={14} strokeWidth={1.75} absoluteStrokeWidth className="mf-hook__icon" aria-hidden />
        <span className="mf-hook__event">submission.created</span>
        <Badge tone="success" className="mf-hook__status">200</Badge>
      </div>
    </Collapse>
  )
}

const OLDER = [
  [72, 96],
  [60, 84],
  [80, 104],
  [66, 90],
  [74, 98],
]

function Submissions({ s, compact }: { s: S; compact?: boolean }) {
  return (
    <div className="mf-subs">
      <div className="mf-subs__head">
        <Text className="mf-subs__title">Submissions</Text>
        <span className="mf-subs__count">
          <Count value={s.submitted ? 129 : 128} />
        </span>
      </div>
      {/* Narrow, the list runs off the stage's foot, so the delivery sits
          under the header where it stays in view */}
      {compact && <Hook s={s} />}
      <Collapse open={s.submitted} reveal="drop">
        <Row
          className="mf-sub"
          lead={<Avatar name="Ananya Rao" size={28} />}
          title={<Text className="mf-sub__name">Ananya Rao</Text>}
          subtitle={<Text className="mf-sub__detail">51–200 employees</Text>}
          meta={<Text className="mf-sub__time">now</Text>}
        />
      </Collapse>
      {OLDER.slice(0, compact ? 5 : 2).map(([n, d], i) => (
        <Row
          key={i}
          className="mf-sub"
          lead={<Avatar size={28} plain />}
          title={<Bar w={n} h={7} tone={3} />}
          subtitle={<Bar w={d} h={6} tone={2} />}
          meta={<Bar w={24} h={5} tone={1} />}
        />
      ))}
      {!compact && <Hook s={s} />}
    </div>
  )
}

export default function MagicForms() {
  return (
    <Stage<S>
      width={1040}
      height={540}
      compact={{ below: 640, width: 358, height: 590 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      cursor={{ at: REST }}
      className="mf"
    >
      {(s, _rect, layout) => {
        const compact = layout === 'compact'
        const share = (
          <Button
            variant={s.copied ? 'secondary' : 'primary'}
            size="small"
            className="mf-share"
            data-target="share"
            icon={s.copied ? <Check size={14} strokeWidth={2} absoluteStrokeWidth aria-hidden /> : undefined}
          >
            {s.copied ? 'Link copied' : 'Share'}
          </Button>
        )
        return (
          <>
            {compact ? (
              // Narrow: no desktop window. The builder as one panel off the
              // foot: its bar with Share, then the form and its submissions
              // stacked on the canvas
              <div className="mf-stack">
                <div className="mf-sheet__head">
                  <Text className="mf-sheet__title">Lead capture</Text>
                  {share}
                </div>
                <div className="mf-stack__body">
                  <div className="mf-sheet">
                    <FormCard s={s} compact />
                  </div>
                  <div className="mf-card">
                    <Submissions s={s} compact />
                  </div>
                </div>
              </div>
            ) : (
              <Window
                className="mf-window"
                title="Lead capture"
                sidebarWidth={196}
                sidebar={
                  <div className="mf-palette">
                    <Text className="mf-palette__label">Add field</Text>
                    {PALETTE.map(({ icon: Glyph, label, target }) => (
                      <Row
                        key={label}
                        pad={8}
                        className="mf-palette__item"
                        data-target={target}
                        lead={<Glyph size={14} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />}
                        title={<Text className="mf-palette__text">{label}</Text>}
                      />
                    ))}
                  </div>
                }
                toolbar={
                  <span className="mf-toolbar">
                    <Bar w={64} h={24} r={7} tone={1} />
                    {share}
                  </span>
                }
              >
                <div className="mf-canvas">
                  <FormCard s={s} compact={false} />
                </div>
              </Window>
            )}
            {!compact && (
              <div className="mf-card">
                <Submissions s={s} />
              </div>
            )}
          </>
        )
      }}
    </Stage>
  )
}

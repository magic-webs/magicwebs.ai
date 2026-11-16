'use client'

import Image from 'next/image'
import { Check, Lock } from 'lucide-react'
import { Avatar, Badge, Bar, Button, Collapse, LockScreen, Notification, Phone, Roll, Stage, Text, WALLPAPER, Window, type Act } from '@/components/stageshow/kit'
import './richyreach.css'

// RichyReach: escrow-secured payments. The brand reviews a creator's reel
// with the fee already locked in escrow, approves it, and the money is
// released: the escrow card turns Released and the creator's phone gets the
// payment notification a beat later.
//
// Device pair: the campaign dashboard pinned top-left, off the bottom; the
// creator's lock screen straddles its right edge over the filler column, so
// the review and the escrow card stay clear. Compact: stacked, the review
// window whole above, the phone below it, off the bottom.
//
// Real strings: the campaign, the creator and her handle, the status, the
// reel, the escrow label and amount, the two buttons, the notification.

// The product's own mark, as the notification's app icon
const LOGO = '/images/platforms/logos/richyreach.png'

type S = { approved: boolean; released: boolean; paid: boolean }
const initial: S = { approved: false, released: false, paid: false }
const poster: S = { approved: true, released: true, paid: true }

async function script(a: Act<S>) {
  await a.wait(900)
  await a.move({ at: 'approve', x: 0.82, y: 0.62 })
  await a.wait(250)
  a.mark('approve')
  await a.click({ at: 'approve', x: 0.82, y: 0.62 })
  await a.set({ approved: true })
  await a.wait(700)
  a.mark('release')
  await a.set({ released: true })
  await a.wait(1100)
  a.mark('paid')
  await a.set({ paid: true })
  await a.wait(3200)
  a.mark('done')
}

function Review({ s, compact }: { s: S; compact?: boolean }) {
  return (
    <section className="rr-review">
      <div className="rr-creator">
        <Avatar name="Ananya Rao" size={36} />
        <span className="rr-creator__who">
          <Text className="rr-creator__name">Ananya Rao</Text>
          <Text className="rr-creator__meta">@ananya.glows · 128K verified</Text>
        </span>
        <Badge tone={s.approved ? 'success' : 'warning'} className="rr-status">
          <Roll>{s.approved ? 'Approved' : 'In review'}</Roll>
        </Badge>
      </div>

      {!compact && (
        <div className="rr-post">
          <span className="rr-post__media" />
          <span className="rr-post__text">
            <Text className="rr-post__title">Diwali glow reel · 0:42</Text>
            <Bar w={compact ? 150 : 188} h={6} tone={2} />
            <Bar w={compact ? 104 : 132} h={6} tone={2} />
          </span>
        </div>
      )}

      <div className="rr-escrow" data-released={s.released || undefined}>
        <span className="rr-escrow__icon">
          <Lock className="rr-escrow__glyph" data-show={!s.released || undefined} size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden />
          <Check className="rr-escrow__glyph" data-show={s.released || undefined} size={16} strokeWidth={2.2} absoluteStrokeWidth aria-hidden />
        </span>
        <span className="rr-escrow__text">
          <span className="rr-escrow__label">
            <Roll>{s.released ? 'Released to Ananya' : 'Held in escrow'}</Roll>
          </span>
          <Text className="rr-escrow__amount">₹40,000</Text>
        </span>
      </div>

      <div className="rr-actions">
        <Button>Request changes</Button>
        <Button variant="primary" data-target="approve" icon={s.approved ? <Check size={14} strokeWidth={2.2} absoluteStrokeWidth aria-hidden /> : undefined}>
          {s.approved ? 'Approved' : 'Approve and release'}
        </Button>
      </div>

      {!compact && (
        <div className="rr-activity">
          <Text className="rr-activity__label">Activity</Text>
          {[196, 154, 212].map((w, i) => (
            <span key={i} className="rr-activity__item">
              <Bar w={8} h={8} r={4} tone={2} />
              <Bar w={w} h={6} tone={2} />
              <Bar w={26} h={5} tone={1} style={{ marginLeft: 'auto' }} />
            </span>
          ))}
        </div>
      )}
    </section>
  )
}

const OTHERS = [
  { name: 66, meta: 92 },
  { name: 54, meta: 104 },
  { name: 72, meta: 84 },
  { name: 60, meta: 98 },
  { name: 68, meta: 88 },
]

export default function RichyReach() {
  return (
    <Stage<S>
      width={1040}
      height={540}
      compact={{ below: 640, width: 358, height: 540 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      cursor={{ at: { wide: { x: 520, y: 470 }, compact: { x: 250, y: 250 } } }}
      className="rr"
    >
      {(s, _rect, layout) => (
        <>
          <Window
            className="rr-window"
            title="Diwali Glow campaign"
            sidebarWidth={layout === 'wide' ? 180 : undefined}
            sidebar={
              layout === 'wide' ? (
                <nav className="rr-nav">
                  {[58, 76, 64, 52, 70].map((w, i) => (
                    <span key={i} className="rr-nav__item" data-active={i === 1 || undefined}>
                      <Bar w={14} h={14} r={4} tone={i === 1 ? 4 : 2} />
                      <Bar w={w} h={6} tone={i === 1 ? 4 : 2} />
                    </span>
                  ))}
                </nav>
              ) : undefined
            }
          >
            {layout === 'wide' ? (
              <div className="rr-app">
                <Review s={s} />
                <aside className="rr-others">
                  <Bar w={72} h={6} tone={3} style={{ marginBottom: 6 }} />
                  {OTHERS.map((o, i) => (
                    <span key={i} className="rr-other">
                      <Avatar size={28} plain />
                      <span className="rr-other__lines">
                        <Bar w={o.name} h={7} tone={3} />
                        <Bar w={o.meta} h={5} tone={2} />
                      </span>
                    </span>
                  ))}
                </aside>
              </div>
            ) : (
              <Review s={s} compact />
            )}
          </Window>

          <Phone width={layout === 'wide' ? 300 : 326} frame="pro" dark wallpaper={WALLPAPER} className="rr-phone">
            {/* Narrow, the phone stands under the review: the clock goes so
                the notifications sit in the slice that shows */}
            <LockScreen size="satellite" stack="top" clock={layout === 'wide'}>
              <Collapse open={s.paid} reveal="drop">
                <Notification
                  icon={<Image src={LOGO} alt="" width={64} height={64} className="rr-app-icon" />}
                  title="Payment released"
                  body="₹40,000 from Kesar Skincare is on its way to your bank"
                />
              </Collapse>
              <Notification icon={<Image src={LOGO} alt="" width={64} height={64} className="rr-app-icon" />} title="New brief near you" body="Kesar Skincare is looking for beauty creators in Pune" time="9:12" />
            </LockScreen>
          </Phone>
        </>
      )}
    </Stage>
  )
}

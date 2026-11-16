'use client'

import { Avatar, Badge, Bar, Button, Collapse, Count, Phone, Roll, Row, Stage, Text, Window, type Act } from '@/components/stageshow/kit'
import './magic-reward.css'

// Magic Reward: play to win, and the play lands in the dashboard. A
// customer at a café, details already entered, taps Spin; the wheel turns
// and slows onto 20% off; the win shows on the phone, and the café's live
// dashboard takes the new registration at the top of its list while the
// day's plays roll up by one.
//
// Device pair, phone left over the window's sidebar: cause, then effect.
// Compact: the phone with the live list as a card under its button.
//
// Real strings: the café's name, the wheel's prizes, the heading and button,
// the two stats, the new row and two rows under it.

type S = { spun: boolean; won: boolean; logged: boolean }

const initial: S = { spun: false, won: false, logged: false }
const poster: S = { spun: true, won: true, logged: true }

async function script(a: Act<S>) {
  await a.wait(1000)
  a.mark('spin')
  await a.click({ at: 'spin', x: 0.5, y: 0.5 })
  await a.set({ spun: true })
  // The wheel's own transition: 4.4s, slowing hard at the end
  await a.wait(4600)
  a.mark('won')
  await a.set({ won: true })
  await a.wait(700)
  a.mark('logged')
  await a.set({ logged: true })
  await a.wait(3200)
  a.mark('done')
}

// Eight prizes, clockwise from the top. The first is the one that wins
const PRIZES = ['20% off', 'Free chai', '10% off', 'Samosa', 'Try again', 'Cookie', '5% off', 'Free chai']
const FILLS = ['#2f4a3a', '#f3eddf', '#7b8f6a', '#f3eddf', '#2f4a3a', '#f3eddf', '#7b8f6a', '#f3eddf']
const INKS = ['#f3eddf', '#2f4a3a', '#fff', '#2f4a3a', '#f3eddf', '#2f4a3a', '#fff', '#2f4a3a']
// At rest a random prize faces the pointer; the spin ends a few degrees
// into the winning segment, as a real wheel does, not dead on its centre
const REST = 112
const LAND = 360 * 5 + 7

function slice(i: number) {
  const r = 128
  const a0 = ((i * 45 - 22.5 - 90) * Math.PI) / 180
  const a1 = ((i * 45 + 22.5 - 90) * Math.PI) / 180
  return `M0 0 L${(r * Math.cos(a0)).toFixed(2)} ${(r * Math.sin(a0)).toFixed(2)} A${r} ${r} 0 0 1 ${(r * Math.cos(a1)).toFixed(2)} ${(r * Math.sin(a1)).toFixed(2)} Z`
}

function Wheel({ s }: { s: S }) {
  return (
    <div className="mr-wheel">
      <svg viewBox="-140 -140 280 280" className="mr-wheel__disc" style={{ rotate: `${s.spun ? LAND : REST}deg` }} aria-hidden>
        <circle r="138" fill="#2f4a3a" />
        {PRIZES.map((p, i) => (
          <g key={i} className="mr-seg" data-dim={(s.won && i !== 0) || undefined}>
            <path d={slice(i)} fill={FILLS[i]} />
            <text transform={`rotate(${i * 45}) translate(0 -86)`} fill={INKS[i]} textAnchor="middle" dominantBaseline="middle">
              {p}
            </text>
          </g>
        ))}
        <circle r="128" fill="none" stroke="#2f4a3a" strokeWidth="2" />
        <circle r="22" fill="#f3eddf" stroke="#2f4a3a" strokeWidth="4" />
      </svg>
      {/* The pointer is part of the offer's artwork, fixed over the rim */}
      <svg viewBox="0 0 28 30" className="mr-wheel__pointer" aria-hidden>
        <path d="M14 29 3.5 6.5A6 6 0 0 1 9 1.5h10a6 6 0 0 1 5.5 5Z" fill="#db704c" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function Offer({ s }: { s: S }) {
  return (
    <div className="mr-offer">
      <div className="mr-brand">Chai Junction</div>
      <div className="mr-head">
        <Roll>{s.won ? 'You won 20% off' : 'Spin to win'}</Roll>
      </div>
      <div className="mr-sub">
        <Roll>{s.won ? 'Show this screen at the counter' : 'Playing as Ananya Iyer'}</Roll>
      </div>
      <Wheel s={s} />
      <Button variant="primary" size="large" className="mr-spin" data-target="spin">
        {s.won ? 'Claim reward' : 'Spin'}
      </Button>
    </div>
  )
}

const OLDER = [
  { name: 'Rohan Mehta', prize: 'Free chai', time: '2 min' },
  { name: 'Kavya Nair', prize: '10% off', time: '6 min' },
]

function Plays({ s, compact }: { s: S; compact?: boolean }) {
  const rows = (
    <div className="mr-rows">
      <Collapse open={s.logged} reveal="drop">
        <Row
          className="mr-row mr-row--new"
          lead={<Avatar name="Ananya Iyer" size={28} />}
          title={<Text className="mr-row__name">Ananya Iyer</Text>}
          meta={<Text className="mr-row__time">now</Text>}
        >
          <Badge tone="success" className="mr-prize">20% off</Badge>
        </Row>
      </Collapse>
      {(compact ? OLDER.slice(0, 1) : OLDER).map((r) => (
        <Row
          key={r.name}
          className="mr-row"
          lead={<Avatar name={r.name} size={28} />}
          title={<Text className="mr-row__name">{r.name}</Text>}
          meta={<Text className="mr-row__time">{r.time}</Text>}
        >
          <Badge className="mr-prize">{r.prize}</Badge>
        </Row>
      ))}
      {!compact &&
        [86, 72, 94, 78, 66].map((w, i) => (
          <Row key={i} className="mr-row" lead={<Avatar size={28} plain />} title={<Bar w={w} h={7} tone={3} />} meta={<Bar w={26} h={5} tone={1} />}>
            <Bar w={52} h={18} r={9} tone={1} />
          </Row>
        ))}
    </div>
  )
  return (
    <section className="mr-plays">
      <div className="mr-stats">
        <div className="mr-stat">
          <Text className="mr-stat__label">Plays today</Text>
          <Count value={s.logged ? 129 : 128} className="mr-stat__value" />
        </div>
        {!compact && (
          <div className="mr-stat">
            <Text className="mr-stat__label">Prizes won</Text>
            <Count value={s.logged ? 42 : 41} className="mr-stat__value" />
          </div>
        )}
      </div>
      <div className="mr-list-head">
        <Text className="mr-list-title">Live plays</Text>
        {!compact && <Bar w={84} h={22} r={7} tone={1} />}
      </div>
      {rows}
    </section>
  )
}

export default function MagicReward() {
  return (
    <Stage<S>
      width={1040}
      height={540}
      compact={{ below: 640, width: 358, height: 600 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      cursor={{ at: { wide: { x: 300, y: 500 }, compact: { x: 260, y: 300 } }, style: 'touch' }}
      className="mr"
    >
      {(s, _rect, layout) => (
        <>
          {layout === 'wide' && (
            <Window
              className="mr-window"
              title="Diwali spin"
              sidebarWidth={200}
              sidebar={
                <nav className="mr-nav">
                  {[64, 88, 56, 76, 60, 70].map((w, i) => (
                    <span key={i} className="mr-nav__item">
                      <Bar w={14} h={14} r={4} tone={i === 1 ? 4 : 2} />
                      <Bar w={w} h={6} tone={i === 1 ? 4 : 2} />
                    </span>
                  ))}
                </nav>
              }
              toolbar={<Badge tone="success" dot className="mr-live">Live</Badge>}
            >
              <Plays s={s} />
            </Window>
          )}

          <Phone width={layout === 'wide' ? 340 : 296} className="mr-phone">
            <Offer s={s} />
          </Phone>

          {layout === 'compact' && (
            <div className="mr-card">
              <Plays s={s} compact />
            </div>
          )}
        </>
      )}
    </Stage>
  )
}

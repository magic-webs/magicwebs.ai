'use client'

import { ChevronLeft, CheckCheck, Phone as PhoneIcon, Video } from 'lucide-react'
import { Avatar, Badge, Bar, Bubble, Button, Icon, Phone, Roll, Row, Stage, Text, Thread, Window, type Act } from '@/components/stageshow/kit'
import './magic-agent.css'

// Magic Agent: what the system does. On the customer's WhatsApp the agent
// asks the one thing missing, the customer answers, and the structured
// enquiry on the dashboard fills in field by field; the agent answers from
// the business's own delivery policy and the enquiry turns Ready to price.
//
// Corner bleed: the dashboard is pinned top, runs off the bottom; the phone
// straddles its left edge over the sidebar only, a strip of sidebar showing.
// Reading order is cause (chat) then effect (enquiry). Compact: the phone,
// with the enquiry card straddling its lower right over empty wallpaper.
//
// Real strings: the four messages, the business name, the selected
// enquiry's name and item, the five fields, the status and the button.

type S = {
  askTyping: boolean
  ask: boolean
  reply: boolean
  print: boolean
  date: boolean
  answerTyping: boolean
  answer: boolean
  lead: boolean
  ready: boolean
}

const initial: S = { askTyping: false, ask: false, reply: false, print: false, date: false, answerTyping: false, answer: false, lead: false, ready: false }
const poster: S = { askTyping: false, ask: true, reply: true, print: true, date: true, answerTyping: false, answer: true, lead: true, ready: true }

async function script(a: Act<S>) {
  await a.wait(900)
  await a.set({ askTyping: true })
  await a.wait(1300)
  a.mark('ask')
  await a.set({ askTyping: false, ask: true })
  await a.wait(1700)
  a.mark('reply')
  await a.set({ reply: true })
  await a.wait(650)
  a.mark('fill')
  await a.set({ print: true })
  await a.wait(380)
  await a.set({ date: true })
  await a.wait(1100)
  await a.set({ answerTyping: true })
  await a.wait(1400)
  a.mark('answer')
  await a.set({ answerTyping: false, answer: true })
  await a.wait(700)
  await a.set({ lead: true })
  await a.wait(600)
  a.mark('ready')
  await a.set({ ready: true })
  await a.wait(3000)
  a.mark('done')
}

const MSG = {
  hi: 'Hi',
  greet: 'Hi Priya, welcome to Inkwell Prints. What can we print for you today?',
  first: 'Hi! Need 500 printed tote bags for an event',
  ask: 'Happy to help. How many print colours, and one side or both?',
  reply: '2 colours, one side. Need them by 28 Nov',
  answer: '500 bags ship in 7 working days, so 28 Nov works. Your quote is on its way.',
}

function Meta({ time, read }: { time: string; read?: boolean }) {
  return (
    <span className="ma-meta">
      {time}
      {read && <CheckCheck size={15} strokeWidth={2} absoluteStrokeWidth className="ma-ticks" aria-hidden />}
    </span>
  )
}

function WhatsApp({ s }: { s: S }) {
  return (
    <>
      <header className="ma-wa-head">
        <ChevronLeft size={28} strokeWidth={2.2} absoluteStrokeWidth className="ma-wa-back" aria-hidden />
        {/* WhatsApp's default picture: no invented logo for a fictional shop */}
        <span className="ma-wa-avatar" data-crop aria-hidden>
          <Icon name="user" filled size={22} />
        </span>
        <span className="ma-wa-who">
          <span className="ma-wa-name">Inkwell Prints</span>
          <span className="ma-wa-status">Business account</span>
        </span>
        <span className="ma-wa-actions">
          <Video size={24} strokeWidth={1.8} absoluteStrokeWidth aria-hidden />
          <PhoneIcon size={21} strokeWidth={1.8} absoluteStrokeWidth aria-hidden />
        </span>
      </header>
      <Thread className="ma-thread">
        <span className="ma-day">Today</span>
        <Bubble from="me">
          {MSG.hi}
          <Meta time="10:40" read />
        </Bubble>
        <Bubble from="them">
          {MSG.greet}
          <Meta time="10:40" />
        </Bubble>
        <Bubble from="me">
          {MSG.first}
          <Meta time="10:41" read />
        </Bubble>
        {(s.askTyping || s.ask) && (
          <Bubble from="them" typing={s.askTyping}>
            {MSG.ask}
            <Meta time="10:41" />
          </Bubble>
        )}
        {s.reply && (
          <Bubble from="me">
            {MSG.reply}
            <Meta time="10:42" read />
          </Bubble>
        )}
        {(s.answerTyping || s.answer) && (
          <Bubble from="them" typing={s.answerTyping}>
            {MSG.answer}
            <Meta time="10:42" />
          </Bubble>
        )}
      </Thread>
    </>
  )
}

function Field({ label, value, on, note }: { label: string; value: string; on: boolean; note?: string }) {
  return (
    <div className="ma-field" data-on={on || undefined}>
      <span className="ma-field__label">{label}</span>
      <span className="ma-field__value">
        <Roll>{on ? value : '—'}</Roll>
        {note && <span className="ma-field__note">{note}</span>}
      </span>
    </div>
  )
}

function Enquiry({ s, compact }: { s: S; compact?: boolean }) {
  const status = (
    <Badge tone={s.ready ? 'success' : 'warning'} className="ma-status">
      <Roll>{s.ready ? 'Ready to price' : 'Collecting'}</Roll>
    </Badge>
  )
  return (
    <section className="ma-enquiry">
      <div className="ma-enquiry__head">
        <Avatar name="Priya Sharma" size={32} />
        <span className="ma-enquiry__who">
          <Text className="ma-enquiry__name">Priya Sharma</Text>
          {/* Narrow, the status takes the channel's line so the name keeps its room */}
          {compact ? status : <Text className="ma-enquiry__via">via WhatsApp</Text>}
        </span>
        {!compact && status}
      </div>
      <div className="ma-fields">
        <Field label="Product" value="Printed tote bags" on />
        <Field label="Quantity" value="500" on />
        <Field label="Print" value="2 colours, one side" on={s.print} />
        <Field label="Needed by" value="28 Nov" on={s.date} />
        <Field label="Lead time" value="7 working days" on={s.lead} />
      </div>
      {/* Narrow, the status says it; the button would crowd the card */}
      {!compact && (
      <div className="ma-enquiry__foot">
        <Button variant={s.ready ? 'primary' : 'secondary'} className="ma-quote" data-ready={s.ready || undefined}>
          Send quote
        </Button>
      </div>
      )}
      {!compact && (
        <div className="ma-activity">
          <Text className="ma-activity__label">Activity</Text>
          {[188, 152, 204].map((w, i) => (
            <span key={i} className="ma-activity__item">
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

const LIST = [
  { name: 70, item: 96 },
  { name: 58, item: 112 },
  { name: 82, item: 84 },
  { name: 64, item: 104 },
  { name: 74, item: 90 },
  { name: 60, item: 108 },
]

export default function MagicAgent() {
  return (
    <Stage<S>
      width={1040}
      height={540}
      compact={{ below: 640, width: 358, height: 600 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      className="ma"
    >
      {(s, _rect, layout) => (
        <>
          {layout === 'wide' && (
            <Window
              className="ma-window"
              title="Enquiries"
              sidebarWidth={200}
              sidebar={
                <nav className="ma-nav">
                  {[64, 88, 56, 76, 60, 70].map((w, i) => (
                    <span key={i} className="ma-nav__item">
                      <Bar w={14} h={14} r={4} tone={i === 1 ? 4 : 2} />
                      <Bar w={w} h={6} tone={i === 1 ? 4 : 2} />
                    </span>
                  ))}
                </nav>
              }
              toolbar={<Bar w={120} h={24} r={7} tone={1} className="ma-search" />}
            >
              <div className="ma-app">
                <div className="ma-list">
                  <Row
                    selected
                    lead={<Avatar name="Priya Sharma" size={32} />}
                    title={<Text className="ma-row__name">Priya Sharma</Text>}
                    subtitle={<Text className="ma-row__item">Printed tote bags</Text>}
                    meta={<Text className="ma-row__time">now</Text>}
                  />
                  {LIST.map((r, i) => (
                    <Row key={i} lead={<Avatar size={32} plain />} title={<Bar w={r.name} h={7} tone={3} />} subtitle={<Bar w={r.item} h={6} tone={2} />} meta={<Bar w={22} h={5} tone={1} />} />
                  ))}
                </div>
                <Enquiry s={s} />
              </div>
            </Window>
          )}

          <Phone width={layout === 'wide' ? 340 : 296} className="ma-phone">
            <WhatsApp s={s} />
          </Phone>

          {layout === 'compact' && (
            <div className="ma-card">
              <Enquiry s={s} compact />
            </div>
          )}
        </>
      )}
    </Stage>
  )
}

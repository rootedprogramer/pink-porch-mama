import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Flamingo from '../components/Flamingo'
import { dayOfYear, focusTips, groupOf, pillars, stageInfo, stageWeeks, trimester, verses, type Pillar, type Stage } from '../data/stages'

const milestones = [
  { weeks: 1, label: 'First week survived 🌸' },
  { weeks: 4, label: 'One month, mama 💪' },
  { weeks: 6, label: 'The 6-week mark ✨' },
  { weeks: 13, label: 'Fourth trimester done 🎉' },
  { weeks: 26, label: 'Halfway through year one 🌟' },
  { weeks: 52, label: 'One full year 🥹' },
]

const pillarLinks: Record<Pillar, string> = { mind: '/learn', heart: '/journal', body: '/move', spirit: '/journal' }

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

function headline(stage: Stage, weeks: number | null): { title: string; body: string } {
  switch (stage) {
    case 'ttc':
      return { title: 'Hope looks different on different days.', body: "Whatever today holds, you're welcome here. Be gentle with yourself." }
    case 'pregnant': {
      const w = weeks ?? 1
      const t = trimester(w)
      return {
        title: `Week ${w}.`,
        body: t === 1 ? "Tiredness, nausea, big feelings: it all counts. Rest is productive right now."
          : t === 2 ? "Many moms get a little more energy in these weeks. Use it gently, and keep resting when you need to."
          : "You're in the home stretch. Rest, prepare, and remember that you're already doing it.",
      }
    }
    case 'postpartum': {
      const w = weeks ?? 0
      if (w <= 1) return { title: 'The very beginning.', body: "You just did something extraordinary. Rest. Everything else can wait." }
      if (w <= 6) return { title: `Week ${w}.`, body: "Your body is healing. Be as gentle with yourself as you are with your baby." }
      if (w <= 12) return { title: `Week ${w}.`, body: "The fog starts to lift around now, but it's okay if it hasn't yet. There's no timeline." }
      if (w <= 26) return { title: `Month ${Math.floor(w / 4)}.`, body: "You're finding your rhythm. It looks different than you imagined, and that's okay." }
      return { title: `Month ${Math.floor(w / 4)}.`, body: "You've grown alongside your baby in ways you're still discovering." }
    }
    case 'littles':
      return { title: "You're doing more than you realize.", body: "The invisible work counts. So do the messy days." }
    case 'growing':
      return { title: 'New questions, same you.', body: "Your kids need you differently now, and you get to need some things too." }
    case 'grown':
      return { title: 'A new chapter is yours.', body: "You've poured a lot into others. This season has room for you." }
  }
}

export default function Home() {
  const { profile } = useAuth()
  if (!profile) return null

  const stage = profile.stage
  const info = stageInfo(stage)
  const weeks = stageWeeks(stage, profile.stage_date)
  const msg = headline(stage, weeks)
  const tip = dayOfYear() % 3
  const group = groupOf(stage)
  const verse = verses[dayOfYear() % verses.length]
  const overdue = stage === 'pregnant' && !!profile.stage_date && new Date(profile.stage_date + 'T00:00:00').getTime() < Date.now()
  const nextMilestone = stage === 'postpartum' && weeks !== null ? milestones.find(m => m.weeks > weeks) : undefined

  const bigText = stage === 'pregnant' || stage === 'postpartum' ? `Week ${weeks ?? 0}` : info.label
  const subText = stage === 'pregnant' && weeks !== null
    ? `Trimester ${trimester(weeks)}${weeks < 40 ? ` · ${40 - weeks} weeks to go` : ''}`
    : nextMilestone && weeks !== null ? `${nextMilestone.weeks - weeks} ${nextMilestone.weeks - weeks === 1 ? 'week' : 'weeks'} until: ${nextMilestone.label}`
    : info.blurb

  return (
    <div style={{ padding: '4.5rem 1.5rem 6rem', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C97B9A', marginBottom: '0.4rem' }}>
            {greeting()}, {profile.name}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{msg.title}</h1>
          <p style={{ marginTop: '0.6rem', lineHeight: 1.75, color: '#9A7D8A' }}>{msg.body}</p>
        </div>
        <Link to="/me" aria-label="Profile" style={{ background: '#F7E8EF', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 12 }}>⚙️</Link>
      </div>

      {overdue && (
        <Link to="/me" style={{ display: 'block', background: '#FDE8EE', border: '1px solid #F4C0D1', borderRadius: 16, padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
          <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Has your baby arrived? 💗</p>
          <p style={{ fontSize: '0.8rem', color: '#9A7D8A', marginTop: 2 }}>Tap to update your season and enter their birthday.</p>
        </Link>
      )}

      <div style={{ background: 'linear-gradient(135deg, #D4577A 0%, #8B4F6B 100%)', borderRadius: 20, padding: '1.5rem', marginBottom: '1.5rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 12, bottom: 4, opacity: 0.95 }}><Flamingo size={78} body="#FFFFFF" dark="#F6D5DF" /></div>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.75, marginBottom: '0.5rem' }}>Your season</p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', fontWeight: 900, lineHeight: 1.1, maxWidth: '65%' }}>{bigText}</p>
        <p style={{ marginTop: '0.6rem', fontSize: '0.82rem', opacity: 0.9, maxWidth: '62%', lineHeight: 1.5 }}>{subText}</p>
      </div>

      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9A7D8A', marginBottom: '0.75rem' }}>Today, in balance</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
        {pillars.map(p => (
          <Link key={p.id} to={pillarLinks[p.id]} style={{ background: 'white', border: '1px solid #EDD8E4', borderLeft: `4px solid ${p.color}`, borderRadius: 14, padding: '0.9rem 1rem', display: 'block' }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color, marginBottom: 4 }}>{p.icon} {p.label}</p>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.55 }}>{focusTips[group][p.id][tip]}</p>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem', marginBottom: '1.5rem' }}>
        {[
          { icon: '🌙', label: "Can't sleep?", sub: 'Tonight mode', to: '/tonight', dark: true },
          { icon: '💭', label: 'How are you?', sub: 'Weekly check-in', to: '/checkin', dark: false },
        ].map(c => (
          <Link key={c.to} to={c.to} style={{ background: c.dark ? '#1A0F16' : '#F7E8EF', color: c.dark ? 'white' : '#2C1A24', border: c.dark ? 'none' : '1px solid #EDD8E4', borderRadius: 16, padding: '1.1rem 1rem', display: 'block' }}>
            <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: 6 }}>{c.icon}</span>
            <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{c.label}</p>
            <p style={{ fontSize: '0.72rem', opacity: 0.65, marginTop: 2 }}>{c.sub}</p>
          </Link>
        ))}
      </div>

      {profile.faith_mode && (
        <div style={{ background: 'white', border: '1px solid #EDD8E4', borderLeft: '3px solid #C97B9A', borderRadius: 16, padding: '1.25rem' }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C97B9A', marginBottom: '0.5rem' }}>Today's word</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', lineHeight: 1.6 }}>"{verse.text}"</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#9A7D8A' }}>{verse.ref}</p>
        </div>
      )}
    </div>
  )
}

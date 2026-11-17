import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { pillars, pillarInfo, stages, type Pillar, type Stage } from '../data/stages'
import { articles } from '../data/learn'

const chip = (active: boolean, color = '#C97B9A') => ({
  padding: '0.45rem 0.9rem', borderRadius: 50, fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap' as const, flexShrink: 0,
  background: active ? color : 'white', color: active ? 'white' : '#9A7D8A', border: `1px solid ${active ? color : '#EDD8E4'}`,
})

export default function Learn() {
  const { profile } = useAuth()
  const [viewStage, setViewStage] = useState<Stage>(profile?.stage ?? 'postpartum')
  const [pillar, setPillar] = useState<Pillar | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  if (!profile) return null

  const list = articles.filter(a => a.stage === viewStage && (pillar === 'all' || a.pillar === pillar))

  return (
    <div style={{ padding: '4.5rem 1.5rem 6rem', maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7C8FC9', marginBottom: '0.4rem' }}>Learn</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Short reads for real life.</h1>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, marginBottom: 10 }}>
        {stages.map(s => (
          <button key={s.id} onClick={() => { setViewStage(s.id); setOpenId(null) }} style={chip(viewStage === s.id)}>
            {s.emoji} {s.short}{s.id === profile.stage ? ' (you)' : ''}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, marginBottom: '1.25rem' }}>
        <button onClick={() => setPillar('all')} style={chip(pillar === 'all', '#2C1A24')}>All</button>
        {pillars.map(p => (
          <button key={p.id} onClick={() => setPillar(p.id)} style={chip(pillar === p.id, p.color)}>{p.icon} {p.label}</button>
        ))}
      </div>

      {list.length === 0 && <p style={{ color: '#9A7D8A', fontStyle: 'italic', textAlign: 'center', padding: '2rem 0' }}>Nothing here yet. More is on the way.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {list.map(a => {
          const p = pillarInfo(a.pillar)
          const open = openId === a.id
          return (
            <div key={a.id} style={{ background: 'white', border: `1px solid ${open ? p.color : '#EDD8E4'}`, borderLeft: `4px solid ${p.color}`, borderRadius: 16, overflow: 'hidden' }}>
              <button onClick={() => setOpenId(open ? null : a.id)} style={{ width: '100%', textAlign: 'left', padding: '1rem 1.1rem' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color, marginBottom: 4 }}>{p.icon} {p.label} · {a.minutes} min</p>
                <p style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.35 }}>{a.title}</p>
              </button>
              {open && (
                <div style={{ padding: '0 1.1rem 1.1rem' }}>
                  {a.body.map((para, i) => (
                    <p key={i} style={{ fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '0.8rem', color: '#4A3541' }}>{para}</p>
                  ))}
                  {profile.faith_mode && a.verse && (
                    <div style={{ background: '#FBF6E9', borderRadius: 12, padding: '0.9rem 1rem', marginTop: 4 }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', lineHeight: 1.6, fontSize: '0.95rem' }}>"{a.verse.text}"</p>
                      <p style={{ fontSize: '0.72rem', color: '#9A7D8A', marginTop: 4 }}>{a.verse.ref}</p>
                      {a.prayer && <p style={{ fontSize: '0.85rem', color: '#6B5A2E', marginTop: 10, lineHeight: 1.6 }}>🙏 {a.prayer}</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

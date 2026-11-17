import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { stageInfo, stageWeeks } from '../data/stages'
import { tracksFor, trackLabel, trackNote, workouts } from '../data/workouts'

const KEY = 'ppm_workouts'

function loadDone(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') as string[] } catch { return [] }
}

export default function Move() {
  const { profile } = useAuth()
  const [openId, setOpenId] = useState<string | null>(null)
  const [done, setDone] = useState<string[]>(loadDone)
  if (!profile) return null

  const weeks = stageWeeks(profile.stage, profile.stage_date)
  const tracks = tracksFor(profile.stage, weeks)
  const list = workouts.filter(w => tracks.includes(w.track))
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const thisWeek = done.filter(d => new Date(d).getTime() > weekAgo).length
  const showWeightCard = profile.stage !== 'ttc' && profile.stage !== 'pregnant'

  function complete(id: string) {
    const next = [...done, new Date().toISOString()]
    setDone(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* ignore */ }
    setOpenId(null)
    void id
  }

  return (
    <div style={{ padding: '4.5rem 1.5rem 6rem', maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8956B', marginBottom: '0.4rem' }}>Move · {stageInfo(profile.stage).short}</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Strong, not shrunk.</h1>
      <p style={{ color: '#9A7D8A', lineHeight: 1.7, marginBottom: '1.25rem' }}>Workouts picked for your season. Short on purpose.</p>

      <div style={{ background: '#FCEFE7', border: '1px solid #F5D5C2', borderRadius: 14, padding: '1rem 1.1rem', marginBottom: '1.25rem' }}>
        <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: 6 }}>Before you start</p>
        {tracks.map(t => (
          <p key={t} style={{ fontSize: '0.8rem', lineHeight: 1.6, color: '#6B4B3A', marginBottom: 6 }}>
            <strong>{trackLabel[t]}:</strong> {trackNote[t]}
          </p>
        ))}
        <p style={{ fontSize: '0.75rem', color: '#9A7D8A', fontStyle: 'italic' }}>This is general information, not medical advice.</p>
      </div>

      <div style={{ background: 'white', border: '1px solid #EDD8E4', borderRadius: 14, padding: '0.9rem 1.1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#E8956B' }}>{thisWeek}</span>
        <span style={{ fontSize: '0.85rem', color: '#9A7D8A' }}>{thisWeek === 1 ? 'workout' : 'workouts'} in the last 7 days</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {list.map(w => {
          const open = openId === w.id
          return (
            <div key={w.id} style={{ background: 'white', border: `1px solid ${open ? '#E8956B' : '#EDD8E4'}`, borderRadius: 16, overflow: 'hidden' }}>
              <button onClick={() => setOpenId(open ? null : w.id)} style={{ width: '100%', textAlign: 'left', padding: '1rem 1.1rem' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8956B', marginBottom: 4 }}>{trackLabel[w.track]}</p>
                <p style={{ fontWeight: 700, fontSize: '1rem' }}>{w.title}</p>
                <p style={{ fontSize: '0.78rem', color: '#9A7D8A', marginTop: 3 }}>{w.minutes} min · {w.level} · {w.equipment}</p>
              </button>
              {open && (
                <div style={{ padding: '0 1.1rem 1.1rem', borderTop: '1px solid #F7E8EF' }}>
                  <ol style={{ margin: '0.9rem 0 1rem 1.1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {w.moves.map(m => (
                      <li key={m.name} style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>
                        <strong>{m.name}</strong>
                        <span style={{ color: '#9A7D8A' }}> · {m.detail}</span>
                      </li>
                    ))}
                  </ol>
                  <button onClick={() => complete(w.id)} style={{ width: '100%', background: '#E8956B', color: 'white', borderRadius: 50, padding: '0.8rem', fontWeight: 700, fontSize: '0.9rem' }}>
                    Mark complete 💪
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showWeightCard && (
        <div style={{ background: '#F7E8EF', border: '1px solid #EDD8E4', borderRadius: 16, padding: '1.1rem 1.25rem' }}>
          <p style={{ fontWeight: 700, marginBottom: 6 }}>Weight loss, gently</p>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: '#6B4B5A' }}>
            Strength training and daily walking do the heavy lifting, with protein at your meals and sleep whenever you can get it. Skip crash diets: they backfire, and your energy matters. If thoughts about food or your body start to feel heavy, talk with your provider.
          </p>
        </div>
      )}
    </div>
  )
}

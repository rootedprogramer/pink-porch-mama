import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { stages, stageInfo, type Stage } from '../data/stages'

const inputStyle = { width: '100%', padding: '0.9rem 1rem', border: '1px solid #EDD8E4', borderRadius: 12, fontSize: '1rem', color: '#2C1A24', outline: 'none', background: 'white' } as const
const label = { fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C97B9A', marginBottom: '0.5rem', display: 'block' } as const

export default function Me() {
  const { user, profile, refreshProfile, signOut } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(profile?.name ?? '')
  const [stage, setStage] = useState<Stage>(profile?.stage ?? 'postpartum')
  const [date, setDate] = useState(profile?.stage_date ?? '')
  const [faith, setFaith] = useState(profile?.faith_mode ?? false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const dateLabel = stageInfo(stage).dateLabel
  const today = new Date().toISOString().slice(0, 10)

  async function save() {
    if (!user) return
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('profiles').update({
      name: name.trim(), stage, stage_date: dateLabel && date ? date : null, faith_mode: faith,
    }).eq('id', user.id)
    if (err) { setError("We couldn't save that. Please try again."); setSaving(false); return }
    await refreshProfile()
    setSaving(false)
    navigate('/home')
  }

  return (
    <div style={{ padding: '5rem 1.5rem 6rem', maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>Your profile</h1>
      <p style={{ color: '#9A7D8A', marginBottom: '1.75rem', lineHeight: 1.7 }}>
        Moving into a new season? Update it here and the whole app shifts with you.
      </p>

      <span style={label}>Name</span>
      <input value={name} onChange={e => setName(e.target.value)} style={{ ...inputStyle, marginBottom: '1.5rem' }} />

      <span style={label}>Your season</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {stages.map(s => (
          <button key={s.id} onClick={() => { setStage(s.id); setDate('') }} style={{
            background: stage === s.id ? '#C97B9A' : 'white', border: `1px solid ${stage === s.id ? '#C97B9A' : '#EDD8E4'}`,
            color: stage === s.id ? 'white' : '#2C1A24', borderRadius: 12, padding: '0.8rem 1rem', textAlign: 'left', fontWeight: 500, fontSize: '0.92rem',
          }}>{s.emoji} {s.label}</button>
        ))}
      </div>

      {dateLabel && (
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={label}>{dateLabel}</span>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            min={stage === 'pregnant' ? today : undefined} max={stage === 'postpartum' ? today : undefined} style={inputStyle} />
        </div>
      )}

      <span style={label}>Faith encouragement</span>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {[true, false].map(v => (
          <button key={String(v)} onClick={() => setFaith(v)} style={{
            flex: 1, background: faith === v ? '#C97B9A' : 'white', border: `1px solid ${faith === v ? '#C97B9A' : '#EDD8E4'}`,
            color: faith === v ? 'white' : '#2C1A24', borderRadius: 12, padding: '0.8rem', fontWeight: 600, fontSize: '0.9rem',
          }}>{v ? 'On 🙏' : 'Off'}</button>
        ))}
      </div>

      {error && <p style={{ color: '#B3405E', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}

      <button onClick={save} disabled={saving || !name.trim() || (!!dateLabel && !date)} style={{
        width: '100%', background: '#C97B9A', color: 'white', borderRadius: 50, padding: '1rem', fontWeight: 700, fontSize: '1rem',
        opacity: saving || !name.trim() || (!!dateLabel && !date) ? 0.5 : 1,
      }}>{saving ? 'Saving...' : 'Save'}</button>

      <button onClick={() => void signOut()} style={{ width: '100%', marginTop: '1rem', color: '#9A7D8A', padding: '0.9rem', fontWeight: 600, fontSize: '0.9rem' }}>
        Sign out
      </button>
    </div>
  )
}

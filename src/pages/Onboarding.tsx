import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Flamingo from '../components/Flamingo'
import { stages, stageInfo, type Stage } from '../data/stages'

type StepId = 'name' | 'stage' | 'date' | 'faith'

const heading = { fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2C1A24', marginBottom: '0.5rem', lineHeight: 1.25 } as const
const sub = { color: '#9A7D8A', marginBottom: '1.5rem', lineHeight: 1.7 } as const
const inputStyle = { width: '100%', padding: '1rem', border: '1px solid #EDD8E4', borderRadius: 12, fontSize: '1rem', color: '#2C1A24', outline: 'none', background: 'white' } as const

function Option({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      background: selected ? '#C97B9A' : 'white', border: `1px solid ${selected ? '#C97B9A' : '#EDD8E4'}`,
      borderRadius: 12, padding: '1rem 1.25rem', color: selected ? 'white' : '#2C1A24',
      textAlign: 'left', fontSize: '0.95rem', fontWeight: 500, transition: 'all 0.2s', width: '100%',
    }}>{children}</button>
  )
}

export default function Onboarding() {
  const { user, refreshProfile } = useAuth()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [stage, setStage] = useState<Stage | null>(null)
  const [date, setDate] = useState('')
  const [faith, setFaith] = useState<boolean | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const dateLabel = stage ? stageInfo(stage).dateLabel : null
  const flow: StepId[] = dateLabel ? ['name', 'stage', 'date', 'faith'] : ['name', 'stage', 'faith']
  const current = flow[Math.min(step, flow.length - 1)]
  const isLast = step >= flow.length - 1
  const today = new Date().toISOString().slice(0, 10)

  const canContinue =
    current === 'name' ? name.trim().length > 0
    : current === 'stage' ? stage !== null
    : current === 'date' ? date !== ''
    : faith !== null

  async function finish() {
    if (!user || !stage) return
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('profiles').upsert({
      id: user.id, name: name.trim(), stage, stage_date: dateLabel && date ? date : null, faith_mode: faith === true,
    })
    if (err) {
      setError(`We couldn't save your profile. (${err.message})`)
      setSaving(false)
      return
    }
    await refreshProfile()
    setSaving(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: '2rem' }}>
          {flow.map((id, i) => (
            <div key={id} style={{ flex: 1, height: 3, borderRadius: 50, background: i <= step ? '#C97B9A' : '#EDD8E4', transition: 'background 0.3s' }} />
          ))}
        </div>

        {current === 'name' && (
          <div>
            <div style={{ marginBottom: '1rem' }}><Flamingo size={56} /></div>
            <h2 style={heading}>What should we call you?</h2>
            <p style={sub}>Just your first name is perfect.</p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" style={inputStyle} />
          </div>
        )}

        {current === 'stage' && (
          <div>
            <h2 style={heading}>Which season are you in?</h2>
            <p style={sub}>You can change this anytime as your life changes.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {stages.map(s => (
                <Option key={s.id} selected={stage === s.id} onClick={() => { setStage(s.id); setDate('') }}>
                  <span style={{ marginRight: 8 }}>{s.emoji}</span>{s.label}
                  <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7, marginTop: 2 }}>{s.blurb}</span>
                </Option>
              ))}
            </div>
          </div>
        )}

        {current === 'date' && (
          <div>
            <h2 style={heading}>{dateLabel}</h2>
            <p style={sub}>This helps us show you the right week-by-week support.</p>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              min={stage === 'pregnant' ? today : undefined} max={stage === 'postpartum' ? today : undefined} style={inputStyle} />
          </div>
        )}

        {current === 'faith' && (
          <div>
            <h2 style={heading}>Would you like faith encouragement?</h2>
            <p style={sub}>Optional scripture and prayers woven in. You can change this anytime.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Option selected={faith === true} onClick={() => setFaith(true)}>Yes, please 🙏</Option>
              <Option selected={faith === false} onClick={() => setFaith(false)}>Not right now</Option>
            </div>
          </div>
        )}

        {error && <p style={{ color: '#B3405E', fontSize: '0.85rem', marginTop: '1rem', lineHeight: 1.5 }}>{error}</p>}

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ background: '#F7E8EF', color: '#9A7D8A', borderRadius: 50, padding: '1rem 1.25rem', fontWeight: 600 }}>Back</button>
          )}
          <button onClick={isLast ? finish : () => setStep(s => s + 1)} disabled={!canContinue || saving} style={{
            flex: 1, background: '#C97B9A', color: 'white', borderRadius: 50, padding: '1rem', fontWeight: 700, fontSize: '1rem',
            opacity: !canContinue || saving ? 0.5 : 1, transition: 'opacity 0.2s',
          }}>
            {isLast ? (saving ? 'Setting up your space...' : 'Welcome to PPM 🌸') : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  )
}

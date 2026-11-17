import { useEffect, useState } from 'react'

const affirmations = [
  "You are not alone right now. Somewhere, another mama is awake too.",
  "This moment is hard. It will not always feel this hard.",
  "You don't have to have it all figured out. Just this breath. Just this moment.",
  "The fact that you're here, holding on, means you're doing it.",
  "3am is its own kind of brave.",
  "Tomorrow is a fresh start. Tonight, just get through.",
  "It's okay to cry. It's okay to not feel okay.",
  "Whatever season you're in, you are more than enough.",
]

type Phase = 'inhale' | 'hold' | 'exhale'

export default function Tonight() {
  const [affIndex, setAffIndex] = useState(0)
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState<Phase>('inhale')
  const [round, setRound] = useState(0)

  useEffect(() => {
    if (!running) return
    const ms = phase === 'inhale' ? 4000 : phase === 'hold' ? 4000 : 6000
    const t = setTimeout(() => {
      if (phase === 'inhale') setPhase('hold')
      else if (phase === 'hold') setPhase('exhale')
      else if (round >= 2) { setRunning(false); setRound(0); setPhase('inhale') }
      else { setRound(r => r + 1); setPhase('inhale') }
    }, ms)
    return () => clearTimeout(t)
  }, [running, phase, round])

  const big = phase === 'inhale' || phase === 'hold'

  return (
    <div style={{ minHeight: '100vh', background: '#1A0F16', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem 6rem', textAlign: 'center' }}>
      <span style={{ fontSize: '3rem', opacity: 0.6, marginBottom: '2rem' }}>🌙</span>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,123,154,0.6)', marginBottom: '1rem' }}>
        You're not alone tonight
      </p>

      <div onClick={() => setAffIndex(i => (i + 1) % affirmations.length)} style={{
        background: 'rgba(201,123,154,0.08)', border: '1px solid rgba(201,123,154,0.2)',
        borderRadius: 20, padding: '2rem', maxWidth: 360, marginBottom: '2rem', cursor: 'pointer',
      }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7 }}>
          "{affirmations[affIndex]}"
        </p>
        <p style={{ marginTop: '1rem', fontSize: '0.7rem', color: 'rgba(201,123,154,0.6)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.1em' }}>tap for another</p>
      </div>

      <div style={{ marginBottom: '2rem', minHeight: 130 }}>
        {!running ? (
          <button onClick={() => { setRunning(true); setPhase('inhale'); setRound(0) }} style={{
            background: 'rgba(201,123,154,0.15)', border: '1px solid rgba(201,123,154,0.3)', borderRadius: 50,
            padding: '0.75rem 1.75rem', color: '#C97B9A', fontFamily: "'DM Mono', monospace", fontSize: '0.72rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>Breathing exercise</button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: big ? 100 : 60, height: big ? 100 : 60, borderRadius: '50%',
              background: 'rgba(201,123,154,0.2)', border: '2px solid rgba(201,123,154,0.5)',
              transition: 'all 4s ease-in-out', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#C97B9A', fontSize: '0.75rem', fontFamily: "'DM Mono', monospace" }}>
                {phase === 'inhale' ? 'breathe in' : phase === 'hold' ? 'hold' : 'breathe out'}
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', fontFamily: "'DM Mono', monospace" }}>{round + 1}/3 breaths</p>
          </div>
        )}
      </div>

      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', maxWidth: 280, lineHeight: 1.7, fontStyle: 'italic' }}>
        Even in the darkest nights, you are held.
      </p>
    </div>
  )
}

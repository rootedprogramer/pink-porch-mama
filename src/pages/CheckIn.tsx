import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { stageWeeks } from '../data/stages'

const questions = [
  { id: 'mood', label: 'How are you feeling overall?', options: ['Really struggling 😔', 'Having a hard day 😕', 'Getting through it 😐', 'Pretty good 🙂', 'Really good 😊'] },
  { id: 'sleep', label: "How's your sleep been?", options: ['What is sleep? 😅', 'Very broken', 'A few stretches', 'Better than last week', 'Actually sleeping!'] },
  { id: 'support', label: 'Do you feel supported?', options: ['Very alone right now', 'Could use more help', 'Somewhat supported', 'Pretty well supported', 'Lots of support'] },
  { id: 'yourself', label: 'Are you getting any time for yourself?', options: ['Not at all', 'Barely any', 'A little', 'Some', 'Yes, regularly'] },
] as const

const flags = ['Really struggling 😔', 'Very alone right now']

export default function CheckIn() {
  const { user, profile } = useAuth()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  async function answer(value: string) {
    const next = { ...answers, [questions[step].id]: value }
    setAnswers(next)
    if (step < questions.length - 1) {
      setTimeout(() => setStep(s => s + 1), 250)
      return
    }
    setDone(true)
    if (user && profile) {
      const weeks = stageWeeks(profile.stage, profile.stage_date)
      await supabase.from('checkins').insert({
        user_id: user.id, mood: next.mood, sleep: next.sleep, support: next.support, yourself: next.yourself, week_number: profile.stage === 'postpartum' ? weeks : null,
      })
    }
  }

  const needsSupport = Object.values(answers).some(a => flags.includes(a))

  if (done) return (
    <div style={{ padding: '5rem 1.5rem 6rem', maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🌸</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Thank you for checking in.</h2>
      <p style={{ color: '#9A7D8A', lineHeight: 1.8, marginBottom: '2rem' }}>Pausing to ask how you're doing is an act of care, for you and for the people who love you.</p>

      {needsSupport && (
        <div style={{ background: '#F7E8EF', border: '1px solid #EDD8E4', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
          <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>💙 You don't have to carry this alone.</p>
          <p style={{ color: '#6B4B5A', fontSize: '0.9rem', lineHeight: 1.7 }}>
            It sounds like things are really hard right now. Please reach out to your provider or someone you trust. Struggling is common and help works.
          </p>
          <p style={{ color: '#6B4B5A', fontSize: '0.9rem', lineHeight: 1.7, marginTop: 10 }}>
            If you're ever thinking about harming yourself or your baby, call or text <a href="tel:988" style={{ color: '#C97B9A', fontWeight: 700 }}>988</a>, or call the National Maternal Mental Health Hotline at <a href="tel:18338526262" style={{ color: '#C97B9A', fontWeight: 700 }}>1-833-852-6262</a>, right away.
          </p>
          <a href="https://www.postpartum.net/get-help/helpline/" target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: '1rem', color: '#C97B9A', fontWeight: 700, fontSize: '0.9rem' }}>
            Postpartum Support International →
          </a>
        </div>
      )}
      <p style={{ color: '#9A7D8A', fontSize: '0.85rem' }}>Check in again next week. 💗</p>
    </div>
  )

  const q = questions[step]
  return (
    <div style={{ padding: '5rem 1.5rem 6rem', maxWidth: 480, margin: '0 auto' }}>
      <div style={{ background: '#F7E8EF', borderRadius: 50, height: 4, marginBottom: '2.5rem', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#C97B9A', width: `${(step / questions.length) * 100}%`, transition: 'width 0.3s ease' }} />
      </div>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C97B9A', marginBottom: '1rem' }}>
        Weekly check-in · {step + 1} of {questions.length}
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.3 }}>{q.label}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {q.options.map(opt => (
          <button key={opt} onClick={() => void answer(opt)} style={{
            background: answers[q.id] === opt ? '#C97B9A' : 'white', border: `1px solid ${answers[q.id] === opt ? '#C97B9A' : '#EDD8E4'}`,
            borderRadius: 12, padding: '1rem 1.25rem', color: answers[q.id] === opt ? 'white' : '#2C1A24', textAlign: 'left', fontSize: '0.95rem', fontWeight: 500,
          }}>{opt}</button>
        ))}
      </div>
    </div>
  )
}

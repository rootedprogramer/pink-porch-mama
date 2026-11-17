import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Flamingo from '../components/Flamingo'

const inputStyle = {
  width: '100%', padding: '1rem', border: '1px solid #EDD8E4', borderRadius: 12,
  fontSize: '0.95rem', color: '#2C1A24', outline: 'none', background: 'white',
} as const

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('signup')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleAuth() {
    setLoading(true)
    setMessage('')
    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      setMessage(error ? error.message : 'Check your email to confirm your account 🌸')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
    }
    setLoading(false)
  }

  const disabled = loading || !email || !password

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F5', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: 380, margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}><Flamingo size={84} /></div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#2C1A24', marginBottom: '0.5rem' }}>
          Pink Porch Mama
        </h1>
        <p style={{ color: '#9A7D8A', marginBottom: '2.5rem', lineHeight: 1.7 }}>
          From hoping to grown kids. You were never meant to do this alone.
        </p>

        <div style={{ display: 'flex', background: '#F7E8EF', borderRadius: 50, padding: 4, marginBottom: '1.5rem' }}>
          {(['signup', 'login'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: '0.5rem', borderRadius: 50, fontSize: '0.85rem', fontWeight: 600,
              background: mode === m ? '#C97B9A' : 'transparent', color: mode === m ? 'white' : '#9A7D8A', transition: 'all 0.2s',
            }}>{m === 'signup' ? 'Join' : 'Sign in'}</button>
          ))}
        </div>

        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Your email" style={{ ...inputStyle, marginBottom: '0.75rem' }} />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" style={{ ...inputStyle, marginBottom: '1.25rem' }} />

        {message && <p style={{ color: '#C97B9A', fontSize: '0.85rem', marginBottom: '1rem' }}>{message}</p>}

        <button onClick={handleAuth} disabled={disabled} style={{
          width: '100%', background: '#C97B9A', color: 'white', borderRadius: 50, padding: '1rem',
          fontWeight: 700, fontSize: '1rem', opacity: disabled ? 0.5 : 1, transition: 'opacity 0.2s',
        }}>
          {loading ? 'One moment...' : mode === 'signup' ? 'Create my account 🌸' : 'Welcome back 💗'}
        </button>
      </div>
    </div>
  )
}

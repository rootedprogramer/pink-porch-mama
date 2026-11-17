import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { journalCats, prompts, type JournalCat } from '../data/journal'

interface Entry { id: string; prompt: string; response: string; category: string | null; created_at: string }

export default function Journal() {
  const { user, profile } = useAuth()
  const [cat, setCat] = useState<JournalCat>('her')
  const [idx, setIdx] = useState(0)
  const [free, setFree] = useState(false)
  const [text, setText] = useState('')
  const [view, setView] = useState<'write' | 'entries'>('write')
  const [entries, setEntries] = useState<Entry[]>([])
  const [saving, setSaving] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    if (view !== 'entries' || !user) return
    supabase.from('journal_entries').select('id,prompt,response,category,created_at').eq('user_id', user.id)
      .order('created_at', { ascending: false }).limit(100)
      .then(({ data }) => setEntries((data as Entry[]) ?? []))
  }, [view, user])

  if (!profile) return null

  const list = prompts.filter(p => p.cat === cat && (!p.stages || p.stages.includes(profile.stage)) && (!p.faith || profile.faith_mode))
  const promptText = free ? 'Free write: whatever is on your mind.' : list[idx % Math.max(list.length, 1)]?.text ?? ''
  const active = journalCats.find(c => c.id === cat) ?? journalCats[0]

  async function save() {
    if (!user || !text.trim()) return
    setSaving(true)
    setNote('')
    const { error } = await supabase.from('journal_entries').insert({ user_id: user.id, prompt: promptText, response: text.trim(), category: free ? 'free' : cat })
    setSaving(false)
    if (error) { setNote("We couldn't save that. Please try again."); return }
    setText('')
    setNote('Saved 💗 Only you can see this.')
    if (!free) setIdx(i => i + 1)
  }

  return (
    <div style={{ padding: '4.5rem 1.5rem 6rem', maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C97B9A', marginBottom: '0.4rem' }}>Journal</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Write it out.</h1>

      <div style={{ display: 'flex', background: '#F7E8EF', borderRadius: 50, padding: 4, marginBottom: '1.25rem' }}>
        {(['write', 'entries'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{ flex: 1, padding: '0.5rem', borderRadius: 50, fontSize: '0.82rem', fontWeight: 600, background: view === v ? '#C97B9A' : 'transparent', color: view === v ? 'white' : '#9A7D8A' }}>
            {v === 'write' ? 'Write' : 'My entries'}
          </button>
        ))}
      </div>

      {view === 'write' ? (
        <div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, marginBottom: '1rem' }}>
            {journalCats.map(c => (
              <button key={c.id} onClick={() => { setCat(c.id); setIdx(0); setFree(false); setNote('') }} style={{
                padding: '0.45rem 0.9rem', borderRadius: 50, fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
                background: cat === c.id ? c.color : 'white', color: cat === c.id ? 'white' : '#9A7D8A', border: `1px solid ${cat === c.id ? c.color : '#EDD8E4'}`,
              }}>{c.label}</button>
            ))}
          </div>

          <div style={{ background: active.soft, borderLeft: `3px solid ${active.color}`, borderRadius: 14, padding: '1.1rem 1.2rem', marginBottom: '1rem' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.6 }}>{promptText}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
              {!free && list.length > 1 && (
                <button onClick={() => setIdx(i => i + 1)} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: active.color }}>Different prompt →</button>
              )}
              <button onClick={() => setFree(f => !f)} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A7D8A' }}>
                {free ? 'Use a prompt' : 'Free write'}
              </button>
            </div>
          </div>

          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Begin writing..." style={{
            width: '100%', background: 'white', border: '1px solid #EDD8E4', borderRadius: 16, padding: '1rem',
            fontSize: '1rem', lineHeight: 1.75, minHeight: 180, resize: 'none', outline: 'none', marginBottom: '0.75rem', color: '#2C1A24',
          }} />
          {note && <p style={{ fontSize: '0.82rem', color: '#C97B9A', marginBottom: '0.75rem' }}>{note}</p>}
          <button onClick={save} disabled={!text.trim() || saving} style={{ width: '100%', background: '#C97B9A', color: 'white', borderRadius: 50, padding: '1rem', fontWeight: 700, opacity: !text.trim() || saving ? 0.5 : 1 }}>
            {saving ? 'Saving...' : 'Save entry'}
          </button>
        </div>
      ) : (
        <div>
          {entries.length === 0 && <p style={{ color: '#9A7D8A', fontStyle: 'italic', textAlign: 'center', padding: '2.5rem 0' }}>Your entries will live here, private to you.</p>}
          {entries.map(e => (
            <div key={e.id} style={{ background: 'white', border: '1px solid #EDD8E4', borderRadius: 16, padding: '1.1rem', marginBottom: '0.8rem' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em', color: '#C97B9A', marginBottom: 6 }}>
                {new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
              <p style={{ fontSize: '0.78rem', fontStyle: 'italic', color: '#9A7D8A', marginBottom: 8, lineHeight: 1.5 }}>{e.prompt}</p>
              <p style={{ lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{e.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

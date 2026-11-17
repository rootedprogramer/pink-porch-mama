import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { stageInfo, type Stage } from '../data/stages'

interface Post { id: string; user_id: string; content: string; created_at: string; name: string; stage: Stage | null }
interface Reply { id: string; post_id: string; content: string; created_at: string; name: string; stage: Stage | null }
interface Like { post_id: string; user_id: string }

function ago(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const byline = (name: string, stage: Stage | null) => `${name} · ${stageInfo(stage).short}`

function PostCard({ post, likeCount, liked, onLike, onDelete }: {
  post: Post; likeCount: number; liked: boolean; onLike: () => void; onDelete: () => void
}) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [replies, setReplies] = useState<Reply[]>([])
  const [text, setText] = useState('')
  const [reported, setReported] = useState(false)

  async function loadReplies() {
    const { data } = await supabase.from('replies_with_author').select('id,post_id,content,created_at,name,stage')
      .eq('post_id', post.id).order('created_at', { ascending: true })
    setReplies((data as Reply[]) ?? [])
  }

  async function toggle() {
    const next = !open
    setOpen(next)
    if (next) await loadReplies()
  }

  async function send() {
    if (!user || !text.trim()) return
    const { error } = await supabase.from('replies').insert({ post_id: post.id, user_id: user.id, content: text.trim() })
    if (!error) { setText(''); await loadReplies() }
  }

  async function report() {
    if (!user) return
    await supabase.from('reports').insert({ post_id: post.id, reporter_id: user.id, reason: 'reported' })
    setReported(true)
  }

  const mine = user?.id === post.user_id

  return (
    <div style={{ background: 'white', border: '1px solid #EDD8E4', borderRadius: 16, padding: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#F28DA6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
          {post.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>{post.name}</p>
          <p style={{ fontSize: '0.68rem', color: '#C97B9A', fontFamily: "'DM Mono', monospace" }}>{stageInfo(post.stage).short} · {ago(post.created_at)}</p>
        </div>
      </div>
      <p style={{ lineHeight: 1.7, marginBottom: 10, whiteSpace: 'pre-wrap' }}>{post.content}</p>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.8rem' }}>
        <button onClick={onLike} style={{ color: liked ? '#C97B9A' : '#9A7D8A', fontWeight: liked ? 700 : 400 }}>{liked ? '❤️' : '🤍'} {likeCount}</button>
        <button onClick={() => void toggle()} style={{ color: '#9A7D8A' }}>💬 Reply</button>
        <span style={{ flex: 1 }} />
        {mine ? (
          <button onClick={onDelete} style={{ color: '#B3A0A9', fontSize: '0.72rem' }}>Delete</button>
        ) : (
          <button onClick={() => void report()} disabled={reported} style={{ color: '#B3A0A9', fontSize: '0.72rem' }}>{reported ? 'Reported' : 'Report'}</button>
        )}
      </div>

      {open && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F7E8EF' }}>
          {replies.map(r => (
            <div key={r.id} style={{ marginBottom: 10 }}>
              <p style={{ fontSize: '0.72rem', color: '#C97B9A', fontFamily: "'DM Mono', monospace" }}>{byline(r.name, r.stage)} · {ago(r.created_at)}</p>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{r.content}</p>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={text} onChange={e => setText(e.target.value)} maxLength={600} placeholder="Say something kind..." style={{ flex: 1, padding: '0.6rem 0.8rem', border: '1px solid #EDD8E4', borderRadius: 50, fontSize: '0.9rem', outline: 'none' }} />
            <button onClick={() => void send()} disabled={!text.trim()} style={{ background: '#C97B9A', color: 'white', borderRadius: 50, padding: '0 1rem', fontWeight: 700, opacity: text.trim() ? 1 : 0.5 }}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Flock() {
  const { user, profile } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [likes, setLikes] = useState<Like[]>([])
  const [filter, setFilter] = useState<'all' | 'mine'>('all')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')

  const myStage = profile?.stage

  const load = useCallback(async () => {
    let q = supabase.from('posts_with_author').select('id,user_id,content,created_at,name,stage')
    if (filter === 'mine' && myStage) q = q.eq('stage', myStage)
    const { data, error: err } = await q.order('created_at', { ascending: false }).limit(50)
    if (err) { setError("The flock isn't loading right now. Please try again in a moment."); setLoading(false); return }
    const list = (data as Post[]) ?? []
    setPosts(list)
    if (list.length) {
      const { data: l } = await supabase.from('post_likes').select('post_id,user_id').in('post_id', list.map(p => p.id))
      setLikes((l as Like[]) ?? [])
    } else {
      setLikes([])
    }
    setError('')
    setLoading(false)
  }, [filter, myStage])

  useEffect(() => { void load() }, [load])

  async function share() {
    if (!user || !text.trim()) return
    setPosting(true)
    const { error: err } = await supabase.from('posts').insert({ user_id: user.id, content: text.trim() })
    setPosting(false)
    if (err) { setError("We couldn't post that. Please try again."); return }
    setText('')
    await load()
  }

  async function toggleLike(postId: string) {
    if (!user) return
    const has = likes.some(l => l.post_id === postId && l.user_id === user.id)
    if (has) {
      setLikes(ls => ls.filter(l => !(l.post_id === postId && l.user_id === user.id)))
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', user.id)
    } else {
      setLikes(ls => [...ls, { post_id: postId, user_id: user.id }])
      await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id })
    }
  }

  async function remove(postId: string) {
    await supabase.from('posts').delete().eq('id', postId)
    setPosts(ps => ps.filter(p => p.id !== postId))
  }

  return (
    <div style={{ padding: '4.5rem 1.5rem 6rem', maxWidth: 480, margin: '0 auto' }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C97B9A', marginBottom: '0.4rem' }}>The Flock</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>You're not alone in this.</h1>
      <p style={{ fontSize: '0.8rem', color: '#9A7D8A', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        Be kind. No shaming, no medical advice. Use Report if something feels off.
      </p>

      <div style={{ background: 'white', border: '1px solid #EDD8E4', borderRadius: 16, padding: '1rem', marginBottom: '1rem' }}>
        <textarea value={text} onChange={e => setText(e.target.value)} maxLength={1000} placeholder="Share something real. How are you actually doing?" style={{
          width: '100%', border: 'none', outline: 'none', resize: 'none', fontSize: '0.95rem', lineHeight: 1.6, minHeight: 70, background: 'transparent', color: '#2C1A24',
        }} />
        {text.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => void share()} disabled={posting} style={{ background: '#C97B9A', color: 'white', borderRadius: 50, padding: '0.5rem 1.25rem', fontSize: '0.8rem', fontWeight: 700 }}>
              {posting ? 'Sharing...' : 'Share 🌸'}
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        {([['all', 'Everyone'], ['mine', myStage ? `My season (${stageInfo(myStage).short})` : 'My season']] as const).map(([id, label]) => (
          <button key={id} onClick={() => { setFilter(id); setLoading(true) }} style={{
            padding: '0.45rem 0.9rem', borderRadius: 50, fontSize: '0.78rem', fontWeight: 600,
            background: filter === id ? '#C97B9A' : 'white', color: filter === id ? 'white' : '#9A7D8A', border: `1px solid ${filter === id ? '#C97B9A' : '#EDD8E4'}`,
          }}>{label}</button>
        ))}
      </div>

      {error && <p style={{ color: '#B3405E', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
      {loading && <p style={{ color: '#9A7D8A', textAlign: 'center', padding: '2rem 0' }}>Gathering the flock...</p>}
      {!loading && !error && posts.length === 0 && (
        <p style={{ color: '#9A7D8A', fontStyle: 'italic', textAlign: 'center', padding: '2rem 0', lineHeight: 1.7 }}>
          No posts yet. Be the first to say hello. You might make someone's day.
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {posts.map(p => (
          <PostCard key={p.id} post={p}
            likeCount={likes.filter(l => l.post_id === p.id).length}
            liked={!!user && likes.some(l => l.post_id === p.id && l.user_id === user.id)}
            onLike={() => void toggleLike(p.id)} onDelete={() => void remove(p.id)} />
        ))}
      </div>
    </div>
  )
}

import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/home', label: 'Home', icon: '🦩' },
  { path: '/move', label: 'Move', icon: '💪' },
  { path: '/learn', label: 'Learn', icon: '📚' },
  { path: '/journal', label: 'Journal', icon: '✍️' },
  { path: '/flock', label: 'Flock', icon: '🤝' },
]

export default function Nav() {
  const location = useLocation()
  const isNight = location.pathname === '/tonight'

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: isNight ? 'rgba(26,15,22,0.95)' : 'rgba(253,248,245,0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: `1px solid ${isNight ? 'rgba(201,123,154,0.2)' : '#EDD8E4'}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '0.6rem 0.5rem calc(0.6rem + env(safe-area-inset-bottom))',
    }}>
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        return (
          <Link key={tab.path} to={tab.path} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            padding: '0.3rem 0.5rem', opacity: active ? 1 : 0.5,
            transition: 'all 0.2s', transform: active ? 'translateY(-2px)' : 'none',
          }}>
            <span style={{ fontSize: '1.3rem' }}>{tab.icon}</span>
            <span style={{
              fontSize: '0.6rem', fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em',
              textTransform: 'uppercase', fontWeight: active ? 500 : 400,
              color: isNight ? (active ? '#C97B9A' : 'rgba(255,255,255,0.5)') : (active ? '#C97B9A' : '#9A7D8A'),
            }}>{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

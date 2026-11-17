export default function Flamingo({ size = 64, body = '#F4A3B8', dark = '#E0708F' }: { size?: number; body?: string; dark?: string }) {
  return (
    <svg width={size} height={size * 1.17} viewBox="0 0 120 140" fill="none" role="img" aria-label="Flamingo">
      <path d="M63 90 Q78 98 68 106 Q61 108 58 101" stroke={dark} strokeWidth="3" strokeLinecap="round" />
      <path d="M57 92 L59 114 L58 133 L70 135" stroke={dark} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 76 C26 60 50 50 70 56 C86 61 90 76 78 86 C66 96 38 94 26 76 Z" fill={body} />
      <path d="M26 76 C20 80 16 86 14 93 C24 89 32 85 38 81 Z" fill={dark} />
      <path d="M42 72 C52 63 68 63 76 71 C68 82 52 84 42 72 Z" fill={dark} opacity="0.55" />
      <path d="M78 62 C98 56 102 36 86 30 C74 25 72 14 82 10" stroke={body} strokeWidth="7" strokeLinecap="round" />
      <circle cx="85" cy="9" r="6.5" fill={body} />
      <path d="M89 6 C98 5 104 11 102 18 C98 14 93 13 89 13 Z" fill="#F7C6D3" />
      <path d="M98 8 C102 10 104 14 102 18 C100 15 98 12 95 10 Z" fill="#2C1A24" />
      <circle cx="86" cy="8" r="1.3" fill="#2C1A24" />
    </svg>
  )
}

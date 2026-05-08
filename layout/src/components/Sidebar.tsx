type Screen =
  | 'splash' | 'login' | 'home' | 'player'
  | 'detalhes' | 'busca' | 'carteira' | 'vip' | 'perfil'

interface Props {
  active: Screen
  onChange: (s: Screen) => void
}

const items: { id: Screen; icon: string; label: string }[] = [
  { id: 'splash',   icon: '🚪', label: 'Splash' },
  { id: 'login',    icon: '🔐', label: 'Login' },
  { id: 'home',     icon: '🏠', label: 'Home' },
  { id: 'player',   icon: '🎬', label: 'Player' },
  { id: 'detalhes', icon: '📺', label: 'Detalhes' },
  { id: 'busca',    icon: '🔍', label: 'Busca' },
  { id: 'carteira', icon: '🪙', label: 'Carteira' },
  { id: 'vip',      icon: '💎', label: 'VIP' },
  { id: 'perfil',   icon: '👤', label: 'Perfil' },
]

export default function Sidebar({ active, onChange }: Props) {
  return (
    <aside style={{
      width: 280,
      background: 'linear-gradient(180deg, #0A0A0A 0%, #141414 100%)',
      borderRight: '2px solid var(--laranja)',
      padding: '24px 16px',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 38,
        letterSpacing: 2,
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 1,
      }}>
        <span style={{ color: 'var(--branco)' }}>Dig</span>
        <span style={{ color: 'var(--laranja)' }}>Vue</span>
      </div>
      <div style={{
        textAlign: 'center',
        color: 'var(--cinza-claro)',
        fontSize: 12,
        marginBottom: 28,
        letterSpacing: 2,
        textTransform: 'uppercase',
      }}>
        Layout Padrão
      </div>

      <div style={{
        color: 'var(--laranja)',
        fontSize: 13,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        margin: '16px 8px 12px',
      }}>
        📱 Telas
      </div>

      {items.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            width: '100%',
            padding: '14px 16px',
            background: active === id
              ? 'linear-gradient(90deg, var(--laranja) 0%, var(--laranja-escuro) 100%)'
              : 'transparent',
            border: 'none',
            borderRadius: 12,
            color: 'var(--branco)',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left',
            marginBottom: 4,
            transition: 'all 0.25s ease',
            boxShadow: active === id ? '0 4px 16px rgba(255, 107, 26, 0.3)' : 'none',
          }}
        >
          <span style={{ fontSize: 22, width: 28, textAlign: 'center' }}>{icon}</span>
          {label}
        </button>
      ))}
    </aside>
  )
}

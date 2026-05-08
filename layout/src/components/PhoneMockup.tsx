import type { ReactNode } from 'react'

interface Props {
  label?: string
  children: ReactNode
  statusBarStyle?: React.CSSProperties
  hasBottomNav?: boolean
  bottomNavActive?: 'home' | 'busca' | 'carteira' | 'perfil'
}

function BottomNav({ active }: { active: Props['bottomNavActive'] }) {
  const items = [
    { id: 'home',     icon: '🏠', label: 'Início' },
    { id: 'busca',    icon: '🔍', label: 'Buscar' },
    { id: 'carteira', icon: '🪙', label: 'Carteira' },
    { id: 'perfil',   icon: '👤', label: 'Perfil' },
  ] as const

  return (
    <div className="nav-inferior">
      {items.map(({ id, icon, label }) => (
        <div key={id} className={`nav-item${active === id ? ' ativo' : ''}`}>
          <div className="nav-icon">{icon}</div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function PhoneMockup({ label, children, statusBarStyle, hasBottomNav, bottomNavActive }: Props) {
  return (
    <div className="celular-wrapper">
      {label && <div className="celular-label">{label}</div>}
      <div className="celular">
        <div className="status-bar" style={statusBarStyle}>
          <span className="horario">9:41</span>
          <span className="icones">📶 📡 🔋</span>
        </div>
        <div className="celular-conteudo">
          {children}
        </div>
        {hasBottomNav && <BottomNav active={bottomNavActive} />}
      </div>
    </div>
  )
}

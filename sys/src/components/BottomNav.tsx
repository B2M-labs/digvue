import { NavLink } from 'react-router-dom'
import { Home, Search, Coins, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const items: { to: string; Icon: LucideIcon; label: string }[] = [
  { to: '/',         Icon: Home,   label: 'Início' },
  { to: '/busca',    Icon: Search, label: 'Buscar' },
  { to: '/carteira', Icon: Coins,  label: 'Carteira' },
  { to: '/perfil',   Icon: User,   label: 'Perfil' },
]

export default function BottomNav() {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 480,
      height: 'var(--nav-height)',
      background: 'rgba(14, 14, 14, 0.96)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid var(--cinza-escuro)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 100,
    }}>
      {items.map(({ to, Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            color: isActive ? 'var(--laranja)' : 'var(--cinza-claro)',
            fontSize: 11,
            fontWeight: 600,
            padding: '8px 20px',
          })}
        >
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

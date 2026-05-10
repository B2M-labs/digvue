import { NavLink } from 'react-router-dom'
import { Home, Search, Coins, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLang } from '../context/LangContext'

type Item = { to: string; Icon: LucideIcon; labelKey: string }

const items: Item[] = [
  { to: '/',         Icon: Home,   labelKey: 'nav_home'    },
  { to: '/busca',    Icon: Search, labelKey: 'nav_search'  },
  { to: '/carteira', Icon: Coins,  labelKey: 'nav_wallet'  },
  { to: '/perfil',   Icon: User,   labelKey: 'nav_profile' },
]

export default function BottomNav() {
  const { t } = useLang()

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
      {items.map(({ to, Icon, labelKey }) => (
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
          {t(labelKey)}
        </NavLink>
      ))}
    </nav>
  )
}

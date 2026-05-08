import { useNavigate } from 'react-router-dom'
import { Tv, Heart, History, Coins, Gem, Bell, Settings, HelpCircle, LogOut, Crown, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const stats = [
  { num: '2450', label: 'Moedas' },
  { num: '42',   label: 'Assistidos' },
  { num: '15',   label: 'Favoritos' },
]

const menuItems: { Icon: LucideIcon; label: string; to: string; danger?: boolean }[] = [
  { Icon: Tv,         label: 'Continuar Assistindo', to: '/' },
  { Icon: Heart,      label: 'Minha Lista',           to: '/' },
  { Icon: History,    label: 'Histórico',             to: '/' },
  { Icon: Coins,      label: 'Carteira de Moedas',    to: '/carteira' },
  { Icon: Gem,        label: 'Gerenciar VIP',         to: '/vip' },
  { Icon: Bell,       label: 'Notificações',          to: '/' },
  { Icon: Settings,   label: 'Configurações',         to: '/' },
  { Icon: HelpCircle, label: 'Ajuda e Suporte',       to: '/' },
  { Icon: LogOut,     label: 'Sair',                  to: '/', danger: true },
]

export default function Perfil() {
  const navigate = useNavigate()

  return (
    <div className="page">
      {/* Header */}
      <div style={{
        padding: '32px var(--page-padding) 24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(255,107,26,0.12) 0%, transparent 100%)',
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--laranja), var(--laranja-escuro))',
          margin: '0 auto 12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, border: '3px solid var(--laranja)',
          boxShadow: '0 8px 20px rgba(255,107,26,0.3)',
        }}>M</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Maria Silva</h2>
        <p style={{ fontSize: 13, color: 'var(--cinza-claro)', marginBottom: 12 }}>maria.silva@email.com</p>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 16px',
          background: 'linear-gradient(90deg, var(--laranja), var(--laranja-escuro))',
          borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 1,
        }}>
          <Crown size={14} /> VIP Anual
        </span>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8, padding: '0 var(--page-padding)', marginBottom: 20,
      }}>
        {stats.map(({ num, label }) => (
          <div key={label} style={{
            background: 'var(--cinza-escuro)', borderRadius: 12, padding: 12, textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 24, color: 'var(--laranja)', lineHeight: 1, marginBottom: 2,
            }}>{num}</div>
            <div style={{ fontSize: 11, color: 'var(--cinza-claro)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div style={{ padding: '0 var(--page-padding)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {menuItems.map(({ Icon, label, to, danger }) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: 14, background: 'var(--cinza-escuro)',
              border: 'none', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div style={{
              width: 36, height: 36, background: 'var(--preto)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: danger ? '#f87171' : 'var(--branco)', flexShrink: 0,
            }}>
              <Icon size={18} />
            </div>
            <span style={{
              flex: 1, fontSize: 14, fontWeight: 600,
              color: danger ? '#f87171' : 'var(--branco)',
            }}>{label}</span>
            <ChevronRight size={18} color="var(--cinza-claro)" />
          </button>
        ))}
      </div>
    </div>
  )
}

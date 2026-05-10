import { useNavigate } from 'react-router-dom'
import { Tv, Heart, History, Coins, Gem, Bell, Settings, HelpCircle, LogOut, Crown, ChevronRight, Globe, ShoppingBag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLang } from '../context/LangContext'
import type { Lang } from '../data/i18n'

type MenuItem = { Icon: LucideIcon; labelKey: string; to: string; danger?: boolean }

const mainMenuItems: MenuItem[] = [
  { Icon: Tv,         labelKey: 'perfil_menu_continue',      to: '/' },
  { Icon: Heart,      labelKey: 'perfil_menu_list',          to: '/' },
  { Icon: History,    labelKey: 'perfil_menu_history',       to: '/' },
  { Icon: Coins,      labelKey: 'perfil_menu_wallet',        to: '/carteira' },
  { Icon: Gem,        labelKey: 'perfil_menu_vip',           to: '/vip' },
  { Icon: Bell,       labelKey: 'perfil_menu_notifications', to: '/' },
  { Icon: Settings,   labelKey: 'perfil_menu_settings',      to: '/' },
  { Icon: HelpCircle, labelKey: 'perfil_menu_help',          to: '/' },
]

export default function Perfil() {
  const navigate = useNavigate()
  const { t, lang, setLang } = useLang()

  const stats = [
    { num: '2450', labelKey: 'perfil_coins_label' },
    { num: '42',   labelKey: 'perfil_watched_label' },
    { num: '15',   labelKey: 'perfil_favorites_label' },
  ]

  const langOptions: { value: Lang; label: string }[] = [
    { value: 'pt', label: 'PT' },
    { value: 'en', label: 'EN' },
  ]

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
          <Crown size={14} /> {t('perfil_vip_badge')}
        </span>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8, padding: '0 var(--page-padding)', marginBottom: 20,
      }}>
        {stats.map(({ num, labelKey }) => (
          <div key={labelKey} style={{
            background: 'var(--cinza-escuro)', borderRadius: 12, padding: 12, textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 24, color: 'var(--laranja)', lineHeight: 1, marginBottom: 2,
            }}>{num}</div>
            <div style={{ fontSize: 11, color: 'var(--cinza-claro)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {t(labelKey)}
            </div>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div style={{ padding: '0 var(--page-padding)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {mainMenuItems.map(({ Icon, labelKey, to }) => (
          <button
            key={labelKey}
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
              color: 'var(--branco)', flexShrink: 0,
            }}>
              <Icon size={18} />
            </div>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--branco)' }}>{t(labelKey)}</span>
            <ChevronRight size={18} color="var(--cinza-claro)" />
          </button>
        ))}

        {/* Seletor de idioma */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: 14, background: 'var(--cinza-escuro)', borderRadius: 12,
        }}>
          <div style={{
            width: 36, height: 36, background: 'var(--preto)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--branco)', flexShrink: 0,
          }}>
            <Globe size={18} />
          </div>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--branco)' }}>
            {t('perfil_language')}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {langOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setLang(value)}
                style={{
                  padding: '6px 14px',
                  background: lang === value ? 'var(--laranja)' : 'var(--preto)',
                  border: `1px solid ${lang === value ? 'var(--laranja)' : 'var(--cinza-medio)'}`,
                  borderRadius: 20,
                  color: 'var(--branco)',
                  fontSize: 12, fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.15s, border-color 0.15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Minhas Compras */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: 14, background: 'var(--cinza-escuro)',
            border: 'none', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{
            width: 36, height: 36, background: 'var(--preto)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--branco)', flexShrink: 0,
          }}>
            <ShoppingBag size={18} />
          </div>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--branco)' }}>
            {t('perfil_menu_purchases')}
          </span>
          <ChevronRight size={18} color="var(--cinza-claro)" />
        </button>

        {/* Sair */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: 14, background: 'var(--cinza-escuro)',
            border: 'none', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{
            width: 36, height: 36, background: 'var(--preto)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#f87171', flexShrink: 0,
          }}>
            <LogOut size={18} />
          </div>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#f87171' }}>
            {t('perfil_menu_logout')}
          </span>
          <ChevronRight size={18} color="var(--cinza-claro)" />
        </button>
      </div>
    </div>
  )
}

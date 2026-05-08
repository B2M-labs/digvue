import PhoneMockup from '../components/PhoneMockup'

const stats = [
  { num: '2450', label: 'Moedas' },
  { num: '42',   label: 'Assistidos' },
  { num: '15',   label: 'Favoritos' },
]

const menuItems = [
  { icon: '📺', label: 'Continuar Assistindo' },
  { icon: '❤️', label: 'Minha Lista' },
  { icon: '📜', label: 'Histórico' },
  { icon: '🪙', label: 'Carteira de Moedas' },
  { icon: '💎', label: 'Gerenciar VIP' },
  { icon: '🔔', label: 'Notificações' },
  { icon: '⚙️', label: 'Configurações' },
  { icon: '❓', label: 'Ajuda e Suporte' },
  { icon: '🚪', label: 'Sair', danger: true },
]

export default function PerfilScreen() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular" hasBottomNav bottomNavActive="perfil">
        <div>
          <div style={{
            padding: '32px 20px 24px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, rgba(255, 107, 26, 0.15) 0%, transparent 100%)',
          }}>
            <div style={{
              width: 90, height: 90, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--laranja), var(--laranja-escuro))',
              margin: '0 auto 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 38, border: '3px solid var(--laranja)',
              boxShadow: '0 8px 20px rgba(255, 107, 26, 0.3)',
            }}>M</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Maria Silva</h2>
            <p style={{ fontSize: 13, color: 'var(--cinza-claro)', marginBottom: 12 }}>maria.silva@email.com</p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px',
              background: 'linear-gradient(90deg, var(--laranja), var(--laranja-escuro))',
              borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 1,
            }}>👑 VIP Anual</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 20px', marginBottom: 20 }}>
            {stats.map(({ num, label }) => (
              <div key={label} style={{ background: 'var(--cinza-escuro)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: 'var(--laranja)', lineHeight: 1, marginBottom: 2 }}>{num}</div>
                <div style={{ fontSize: 11, color: 'var(--cinza-claro)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 20px' }}>
            {menuItems.map(({ icon, label, danger }, i) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: 14,
                background: 'var(--cinza-escuro)',
                borderRadius: 12,
                marginBottom: i === menuItems.length - 1 ? 24 : 8,
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 36, height: 36, background: 'var(--preto)',
                  borderRadius: 10, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18,
                }}>{icon}</div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: danger ? '#f87171' : undefined }}>{label}</div>
                <span style={{ color: 'var(--cinza-claro)', fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>
        </div>
      </PhoneMockup>
    </div>
  )
}

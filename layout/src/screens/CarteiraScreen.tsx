import PhoneMockup from '../components/PhoneMockup'

const pacotes = [
  { icon: '🪙', moedas: '100',  bonus: 'moedas',       preco: 'R$ 9,90',   popular: false },
  { icon: '🪙', moedas: '500',  bonus: '+50 bônus',    preco: 'R$ 39,90',  popular: true },
  { icon: '🪙', moedas: '1000', bonus: '+200 bônus',   preco: 'R$ 79,90',  popular: false },
  { icon: '💎', moedas: '5000', bonus: '+1500 bônus',  preco: 'R$ 299,90', popular: false },
]

const historico = [
  { info: 'Episódio 4 desbloqueado', data: 'Hoje • 14:30',     valor: '-50',  positivo: false },
  { info: 'Pacote 500 moedas',       data: 'Ontem • 19:15',    valor: '+550', positivo: true },
  { info: 'Anúncio assistido',       data: 'Ontem • 12:00',    valor: '+10',  positivo: true },
  { info: 'Bônus diário',            data: '2 dias atrás',     valor: '+25',  positivo: true },
]

export default function CarteiraScreen() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular" hasBottomNav bottomNavActive="carteira">
        <div>
          <div style={{ padding: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>🪙 Minha Carteira</h2>
          </div>

          <div style={{
            margin: '0 20px 24px',
            background: 'linear-gradient(135deg, var(--laranja) 0%, var(--laranja-escuro) 100%)',
            borderRadius: 20, padding: 24,
            boxShadow: '0 12px 32px rgba(255, 107, 26, 0.25)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -40, right: -40,
              width: 160, height: 160, background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
            }} />
            <div style={{ fontSize: 13, opacity: 0.9, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Saldo Atual</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, lineHeight: 1, marginBottom: 4 }}>2.450</div>
            <div style={{ fontSize: 14, opacity: 0.9 }}>moedas DigVue</div>
          </div>

          <h3 style={{ padding: '0 20px 12px', fontSize: 18, fontWeight: 800 }}>💰 Comprar Moedas</h3>
          <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {pacotes.map(({ icon, moedas, bonus, preco, popular }) => (
              <div key={moedas} style={{
                background: 'var(--cinza-escuro)',
                border: `2px solid ${popular ? 'var(--laranja)' : 'transparent'}`,
                borderRadius: 16, padding: 16, textAlign: 'center',
                cursor: 'pointer', position: 'relative',
              }}>
                {popular && (
                  <span style={{
                    position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--laranja)', padding: '3px 10px', borderRadius: 6,
                    fontSize: 10, fontWeight: 800, letterSpacing: 1,
                  }}>POPULAR</span>
                )}
                <div style={{ fontSize: 28 }}>{icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: 'var(--laranja)', lineHeight: 1, margin: '8px 0 4px' }}>{moedas}</div>
                <div style={{ fontSize: 11, color: 'var(--cinza-claro)', marginBottom: 12 }}>{bonus}</div>
                <div style={{ background: 'var(--preto)', padding: 8, borderRadius: 8, fontWeight: 700, fontSize: 14 }}>{preco}</div>
              </div>
            ))}
          </div>

          <h3 style={{ padding: '24px 20px 12px', fontSize: 18, fontWeight: 800 }}>📜 Histórico</h3>
          {historico.map(({ info, data, valor, positivo }) => (
            <div key={info} style={{
              margin: '0 20px 8px',
              padding: 14,
              background: 'var(--cinza-escuro)',
              borderRadius: 12,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{info}</div>
                <div style={{ fontSize: 11, color: 'var(--cinza-claro)', marginTop: 2 }}>{data}</div>
              </div>
              <div style={{ fontWeight: 700, color: positivo ? '#4ade80' : '#f87171' }}>{valor}</div>
            </div>
          ))}
        </div>
      </PhoneMockup>
    </div>
  )
}

import PhoneMockup from '../components/PhoneMockup'

const beneficios = [
  'Todos os episódios liberados',
  'Sem anúncios',
  'Conteúdo exclusivo',
  'Qualidade HD',
  'Download offline',
]

const planos = [
  { icon: '📅', nome: 'Mensal',   eco: 'Comece agora',    preco: 'R$ 19,90', periodo: 'por mês',   sel: false },
  { icon: '⭐', nome: 'Anual',    eco: 'Economize 60%!',  preco: 'R$ 99,90', periodo: 'por ano',   sel: true },
  { icon: '💎', nome: 'Vitalício',eco: 'Pague uma vez só', preco: 'R$ 299',  periodo: 'único',     sel: false },
]

export default function VipScreen() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular">
        <div style={{ padding: 20 }}>
          <div style={{ textAlign: 'center', fontSize: 64, margin: '16px 0 12px' }}>👑</div>
          <h1 style={{
            textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 38, letterSpacing: 2, color: 'var(--laranja)', marginBottom: 4,
          }}>DigVue VIP</h1>
          <p style={{ textAlign: 'center', color: 'var(--cinza-claro)', fontSize: 14, marginBottom: 24 }}>
            Assista tudo sem limites
          </p>

          <div style={{ background: 'var(--cinza-escuro)', borderRadius: 16, padding: 16, marginBottom: 20 }}>
            {beneficios.map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
                <div style={{
                  width: 24, height: 24, background: 'var(--laranja)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, flexShrink: 0,
                }}>✓</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{b}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {planos.map(({ icon, nome, eco, preco, periodo, sel }) => (
              <div key={nome} style={{
                background: sel
                  ? 'linear-gradient(135deg, rgba(255,107,26,0.1) 0%, var(--cinza-escuro) 100%)'
                  : 'var(--cinza-escuro)',
                border: `2px solid ${sel ? 'var(--laranja)' : 'var(--cinza-medio)'}`,
                borderRadius: 16, padding: 16, cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{icon} {nome}</div>
                    <div style={{ fontSize: 11, color: 'var(--laranja)', marginTop: 2 }}>{eco}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--laranja)', lineHeight: 1 }}>{preco}</div>
                    <div style={{ fontSize: 11, color: 'var(--cinza-claro)' }}>{periodo}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="botao-laranja">Assinar VIP Anual 👑</button>
          <p style={{ textAlign: 'center', color: 'var(--cinza-claro)', fontSize: 11, marginTop: 16, paddingBottom: 16 }}>
            Cancele quando quiser. Sem fidelidade.
          </p>
        </div>
      </PhoneMockup>
    </div>
  )
}

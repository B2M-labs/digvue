import PhoneMockup from '../components/PhoneMockup'
import DesktopMockup from '../components/DesktopMockup'

const episodios = [
  { titulo: 'Ep 1: O Acordo',      dur: '5 min • Grátis',    bg: 'linear-gradient(135deg, #ff6b1a, #4a1a0a)', locked: false },
  { titulo: 'Ep 2: Primeira Noite',dur: '5 min • Grátis',    bg: 'linear-gradient(135deg, #1a3a8b, #0a1a4a)', locked: false },
  { titulo: 'Ep 3: Sentimentos',   dur: '5 min • Grátis',    bg: 'linear-gradient(135deg, #4a1a8b, #1a0a4a)', locked: false },
  { titulo: 'Ep 4: A Verdade',     dur: '5 min • 50 moedas', bg: 'linear-gradient(135deg, #8b1a3a, #4a0a1a)', locked: true },
  { titulo: 'Ep 5: Confronto',     dur: '5 min • 50 moedas', bg: 'linear-gradient(135deg, #1a8b4a, #0a4a1a)', locked: true },
]

const desktopEps = [
  ...episodios,
  { titulo: 'Ep 6: Decisão', dur: '50 moedas', bg: 'linear-gradient(135deg, #ff6b1a, #4a1a0a)', locked: true },
]

export default function DetalhesScreen() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular" statusBarStyle={{
        background: 'rgba(0,0,0,0.4)', position: 'absolute',
        left: 0, right: 0, zIndex: 50, color: 'white',
      }}>
        <div>
          <div style={{
            height: 240,
            background: 'linear-gradient(180deg, transparent 50%, var(--preto-suave) 100%), linear-gradient(135deg, #4a1a0a 0%, #d44a14 100%)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 50, left: 16,
              width: 40, height: 40, background: 'rgba(0,0,0,0.6)',
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 20, cursor: 'pointer', zIndex: 5,
            }}>←</div>
          </div>

          <div style={{ padding: 20, marginTop: -40, position: 'relative' }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Casamento Falso</h1>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, fontSize: 13, color: 'var(--cinza-claro)', flexWrap: 'wrap' }}>
              {[{ label: '⭐ 4.8', orange: true }, { label: '2026' }, { label: 'Romance' }, { label: '32 eps' }].map(({ label, orange }) => (
                <span key={label} style={{ padding: '3px 8px', background: 'var(--cinza-escuro)', borderRadius: 4, color: orange ? 'var(--laranja)' : undefined, fontWeight: orange ? 700 : undefined }}>{label}</span>
              ))}
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: 20 }}>
              Ela aceitou casar com o bilionário por 1 milhão de reais. Era apenas um contrato, sem amor, sem carinho. Mas quando o coração começa a falar mais alto que o dinheiro...
            </p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <button className="botao-play" style={{ flex: 1 }}>▶ Episódio 1</button>
              <button className="botao-add">+ Lista</button>
              <button className="botao-add">📤</button>
            </div>

            <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid var(--cinza-escuro)', marginBottom: 16 }}>
              {['Episódios', 'Comentários', 'Similares'].map((tab, i) => (
                <div key={tab} style={{
                  padding: '10px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  color: i === 0 ? 'var(--laranja)' : 'var(--cinza-claro)',
                  borderBottom: i === 0 ? '2px solid var(--laranja)' : '2px solid transparent',
                }}>{tab}</div>
              ))}
            </div>

            {episodios.map(({ titulo, dur, bg, locked }) => (
              <div key={titulo} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--cinza-escuro)', cursor: 'pointer' }}>
                <div style={{ width: 100, height: 60, borderRadius: 8, background: bg, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, opacity: 0.9 }}>▶</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{titulo}</div>
                  <div style={{ fontSize: 12, color: 'var(--cinza-claro)' }}>{dur}</div>
                </div>
                {locked && <span style={{ color: 'var(--laranja)', fontSize: 16, alignSelf: 'center' }}>🔒</span>}
              </div>
            ))}
          </div>
        </div>
      </PhoneMockup>

      <DesktopMockup label="💻 Computador">
        <div style={{ padding: 24 }}>
          <div style={{
            height: 360, borderRadius: 12, marginBottom: 24,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%), linear-gradient(135deg, #4a1a0a 0%, #d44a14 100%)',
            padding: 40, display: 'flex', alignItems: 'flex-end',
          }}>
            <div style={{ maxWidth: '60%' }}>
              <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 12, lineHeight: 1.1 }}>Casamento Falso</h1>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 14, color: 'var(--cinza-claro)' }}>
                <span style={{ color: 'var(--laranja)', fontWeight: 700 }}>⭐ 4.8</span>
                <span>2026</span><span>Romance</span><span>32 episódios</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 20, maxWidth: 600 }}>
                Ela aceitou casar com o bilionário por 1 milhão de reais. Era apenas um contrato, sem amor, sem carinho. Mas quando o coração começa a falar mais alto que o dinheiro, tudo pode acontecer...
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="botao-play">▶ Assistir Ep. 1</button>
                <button className="botao-add">+ Minha Lista</button>
                <button className="botao-add">📤 Compartilhar</button>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>📺 Episódios</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {desktopEps.map(({ titulo, dur, bg, locked }) => (
              <div key={titulo} style={{ background: 'var(--cinza-escuro)', borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ width: '100%', aspectRatio: '16/9', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                  {locked ? '🔒' : '▶'}
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{titulo}</div>
                  <div style={{ fontSize: 12, color: locked ? 'var(--laranja)' : 'var(--cinza-claro)' }}>{dur}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DesktopMockup>
    </div>
  )
}

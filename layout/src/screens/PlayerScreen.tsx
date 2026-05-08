import PhoneMockup from '../components/PhoneMockup'
import DesktopMockup from '../components/DesktopMockup'

function PlayerMobile() {
  return (
    <div style={{ position: 'relative', height: '100%', background: '#000', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 30% 40%, rgba(255, 107, 26, 0.2) 0%, transparent 50%), linear-gradient(180deg, #2a1a0a 0%, #1a0a0a 100%)',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 80, height: 80, background: 'rgba(255, 107, 26, 0.9)',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 32, color: 'var(--branco)',
          boxShadow: '0 8px 24px rgba(255, 107, 26, 0.5)',
        }}>▶</div>
      </div>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '16px 20px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7), transparent)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10,
      }}>
        <div style={{ width: 40, height: 40, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer' }}>←</div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 700 }}>
          Casamento Falso
          <div style={{ fontSize: 11, color: 'var(--cinza-claro)' }}>Episódio 5</div>
        </div>
        <div style={{ width: 40, height: 40, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer' }}>⋯</div>
      </div>

      <div style={{
        position: 'absolute', right: 12, bottom: 100,
        display: 'flex', flexDirection: 'column', gap: 16, zIndex: 10,
      }}>
        {[['❤️', '12.5K'], ['💬', '348'], ['📤', 'Enviar'], ['🔖', 'Salvar']].map(([icon, num]) => (
          <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700 }}>{num}</div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 30, left: 20, right: 80, zIndex: 10 }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Casamento Falso</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 12, lineHeight: 1.4 }}>
          Ela aceitou casar por 1 milhão. Mas o coração não obedece contratos...
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 12, left: 20, right: 20, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden', zIndex: 10 }}>
        <div style={{ height: '100%', width: '45%', background: 'var(--laranja)' }} />
      </div>
    </div>
  )
}

function PlayerBloqueado() {
  return (
    <div style={{ position: 'relative', height: '100%', background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(255, 107, 26, 0.2) 0%, transparent 50%), linear-gradient(180deg, #2a1a0a 0%, #1a0a0a 100%)' }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, padding: '16px 20px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7), transparent)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10,
      }}>
        <div style={{ width: 40, height: 40, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>←</div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 700 }}>
          Casamento Falso
          <div style={{ fontSize: 11, color: 'var(--cinza-claro)' }}>Episódio 8</div>
        </div>
        <div style={{ width: 40, height: 40, background: 'rgba(0,0,0,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>⋯</div>
      </div>

      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', zIndex: 20, padding: 32, textAlign: 'center',
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🔒</div>
        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Episódio Bloqueado</h3>
        <p style={{ color: 'var(--cinza-claro)', fontSize: 14, marginBottom: 24 }}>Desbloqueie para continuar assistindo</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          {[
            { label: '🪙 Usar 50 moedas', right: '→', principal: true },
            { label: '📺 Assistir anúncio', right: 'Grátis', principal: false },
            { label: '💎 Assinar VIP', right: 'R$ 19,90', principal: false },
          ].map(({ label, right, principal }) => (
            <div key={label} style={{
              padding: 14,
              background: principal ? 'var(--laranja)' : 'var(--cinza-escuro)',
              borderRadius: 12, border: `1px solid ${principal ? 'var(--laranja)' : 'var(--cinza-medio)'}`,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', fontSize: 14, fontWeight: 600,
            }}>
              <span>{label}</span>
              <span>{right}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlayerDesktop() {
  const nextEps = [
    { ep: 'Ep 6', dur: '5 min', bg: 'linear-gradient(135deg, #ff6b1a, #4a1a0a)', locked: false },
    { ep: 'Ep 7', dur: '5 min', bg: 'linear-gradient(135deg, #1a3a8b, #0a1a4a)', locked: false },
    { ep: 'Ep 8', dur: '50 moedas', bg: 'linear-gradient(135deg, #4a1a8b, #1a0a4a)', locked: true },
  ]

  return (
    <div style={{ padding: 24 }}>
      <div style={{ width: '100%', aspectRatio: '16/9', background: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 26, 0.2) 0%, transparent 50%), #000', borderRadius: 12, position: 'relative', marginBottom: 16 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 80, height: 80, background: 'rgba(255, 107, 26, 0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 8px 24px rgba(255, 107, 26, 0.5)' }}>▶</div>
        <div style={{ position: 'absolute', bottom: 12, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20 }}>⏸</span>
          <span style={{ fontSize: 13 }}>12:34</span>
          <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '35%', background: 'var(--laranja)' }} />
          </div>
          <span style={{ fontSize: 13 }}>35:00</span>
          <span style={{ fontSize: 18 }}>🔊</span>
          <span style={{ fontSize: 18 }}>⛶</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 2 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Casamento Falso - Episódio 5</h2>
          <div style={{ display: 'flex', gap: 16, color: 'var(--cinza-claro)', marginBottom: 16, fontSize: 14 }}>
            <span>⭐ 4.8</span><span>👁 1.2M views</span><span>📅 2026</span>
          </div>
          <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', marginBottom: 20 }}>
            Ela aceitou casar por 1 milhão de reais. Mas o coração não obedece contratos. Quando os sentimentos começam a aparecer, tudo muda...
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="botao-play">❤️ Curtir</button>
            <button className="botao-add">📤 Compartilhar</button>
            <button className="botao-add">+ Lista</button>
          </div>
        </div>
        <div style={{ flex: 1, background: 'var(--cinza-escuro)', borderRadius: 12, padding: 16 }}>
          <h4 style={{ fontWeight: 700, marginBottom: 12 }}>Próximos episódios</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {nextEps.map(({ ep, dur, bg, locked }) => (
              <div key={ep} style={{ display: 'flex', gap: 10, padding: 8, background: 'var(--preto-suave)', borderRadius: 8, cursor: 'pointer', opacity: locked ? 0.6 : 1 }}>
                <div style={{ width: 80, height: 50, borderRadius: 6, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  {locked ? '🔒' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{ep}</div>
                  <div style={{ fontSize: 11, color: locked ? 'var(--laranja)' : 'var(--cinza-claro)' }}>{dur}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PlayerScreen() {
  const statusStyle: React.CSSProperties = {
    background: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    left: 0, right: 0, zIndex: 50,
    color: 'white',
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular - Assistindo" statusBarStyle={statusStyle}>
        <div style={{ position: 'relative' }}>
          <PlayerMobile />
        </div>
      </PhoneMockup>

      <PhoneMockup label="📱 Celular - Bloqueado" statusBarStyle={statusStyle}>
        <div style={{ position: 'relative' }}>
          <PlayerBloqueado />
        </div>
      </PhoneMockup>

      <DesktopMockup label="💻 Computador">
        <PlayerDesktop />
      </DesktopMockup>
    </div>
  )
}

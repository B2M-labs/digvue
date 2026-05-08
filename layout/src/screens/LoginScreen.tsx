import PhoneMockup from '../components/PhoneMockup'
import DesktopMockup from '../components/DesktopMockup'

function LoginForm() {
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 48,
        textAlign: 'center',
        margin: '40px 0 8px',
        letterSpacing: 2,
      }}>
        <span style={{ color: 'var(--branco)' }}>Dig</span>
        <span style={{ color: 'var(--laranja)' }}>Vue</span>
      </div>
      <h2 style={{ textAlign: 'center', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Bem-vindo!</h2>
      <p style={{ textAlign: 'center', color: 'var(--cinza-claro)', fontSize: 15, marginBottom: 40 }}>
        Entre para assistir
      </p>

      <div className="input-grupo">
        <label className="input-label">Email</label>
        <input type="email" className="input-campo" placeholder="seu@email.com" />
      </div>
      <div className="input-grupo">
        <label className="input-label">Senha</label>
        <input type="password" className="input-campo" placeholder="••••••••" />
      </div>

      <button className="botao-laranja">Entrar</button>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        margin: '24px 0',
        color: 'var(--cinza-claro)',
        fontSize: 13,
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--cinza-escuro)' }} />
        ou continue com
        <div style={{ flex: 1, height: 1, background: 'var(--cinza-escuro)' }} />
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {['G', 'f', '🍎'].map((s) => (
          <button key={s} style={{
            flex: 1,
            padding: 14,
            background: 'var(--cinza-escuro)',
            border: '1px solid var(--cinza-medio)',
            borderRadius: 12,
            color: 'var(--branco)',
            fontSize: 15,
            fontWeight: 600,
          }}>{s}</button>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        color: 'var(--cinza-claro)',
        fontSize: 14,
        marginTop: 'auto',
        paddingBottom: 16,
      }}>
        Não tem conta? <a href="#">Cadastre-se</a>
      </div>
    </div>
  )
}

export default function LoginScreen() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular">
        <LoginForm />
      </PhoneMockup>

      <DesktopMockup label="💻 Computador">
        <div style={{ display: 'flex', minHeight: 600 }}>
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, #4a1a0a 0%, #8b2f0e 50%, #d44a14 100%)',
            padding: 60,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 72,
              letterSpacing: 2,
              lineHeight: 1,
              marginBottom: 16,
            }}>
              <span style={{ color: 'white' }}>Dig</span>
              <span style={{ color: 'white' }}>Vue</span>
            </div>
            <p style={{ fontSize: 20, lineHeight: 1.5, opacity: 0.95 }}>Histórias curtinhas. Emoções gigantes.</p>
            <p style={{ fontSize: 14, opacity: 0.8, marginTop: 12 }}>Mais de 10.000 episódios para você assistir.</p>
          </div>
          <div style={{ flex: 1, padding: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 480 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Bem-vindo de volta!</h2>
            <p style={{ color: 'var(--cinza-claro)', marginBottom: 32 }}>Entre para continuar assistindo</p>
            <div className="input-grupo">
              <label className="input-label">Email</label>
              <input type="email" className="input-campo" placeholder="seu@email.com" />
            </div>
            <div className="input-grupo">
              <label className="input-label">Senha</label>
              <input type="password" className="input-campo" placeholder="••••••••" />
            </div>
            <button className="botao-laranja">Entrar</button>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              margin: '24px 0', color: 'var(--cinza-claro)', fontSize: 13,
            }}>
              <div style={{ flex: 1, height: 1, background: 'var(--cinza-escuro)' }} />
              ou
              <div style={{ flex: 1, height: 1, background: 'var(--cinza-escuro)' }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Google', 'Facebook'].map((s) => (
                <button key={s} style={{
                  flex: 1, padding: 14, background: 'var(--cinza-escuro)',
                  border: '1px solid var(--cinza-medio)', borderRadius: 12,
                  color: 'var(--branco)', fontSize: 15, fontWeight: 600,
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </DesktopMockup>
    </div>
  )
}

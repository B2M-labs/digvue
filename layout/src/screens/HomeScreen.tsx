import PhoneMockup from '../components/PhoneMockup'
import DesktopMockup from '../components/DesktopMockup'

const dramas = [
  { titulo: 'Casamento Falso', info: '⭐ 4.8 • 32 eps', cor: 'cor1', badge: 'NOVO' },
  { titulo: 'Vingança Doce',   info: '⭐ 4.6 • 28 eps', cor: 'cor2' },
  { titulo: 'Lobo Alfa',       info: '⭐ 4.9 • 50 eps', cor: 'cor3' },
  { titulo: 'Filha Perdida',   info: '⭐ 4.7 • 40 eps', cor: 'cor4' },
]

const romances = [
  { titulo: 'Para Sempre',    info: '⭐ 4.5 • 25 eps', cor: 'cor5' },
  { titulo: 'Coração de Gelo',info: '⭐ 4.8 • 38 eps', cor: 'cor1' },
  { titulo: 'Príncipe Real',  info: '⭐ 4.9 • 45 eps', cor: 'cor2', badge: 'VIP' },
]

function DramaCard({ titulo, info, cor, badge }: { titulo: string; info: string; cor: string; badge?: string }) {
  return (
    <div style={{ flexShrink: 0, width: 130, cursor: 'pointer' }}>
      <div className={`card-drama-imagem ${cor}`} style={{
        width: 130, height: 180, borderRadius: 12, marginBottom: 8,
        position: 'relative', overflow: 'hidden',
      }}>
        {badge && (
          <span style={{
            position: 'absolute', top: 8, right: 8,
            padding: '3px 8px', background: 'var(--laranja)',
            color: 'var(--branco)', fontSize: 10, fontWeight: 800,
            borderRadius: 4, textTransform: 'uppercase',
          }}>{badge}</span>
        )}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{titulo}</div>
      <div style={{ color: 'var(--cinza-claro)', fontSize: 12 }}>{info}</div>
    </div>
  )
}

function Section({ title, items }: { title: string; items: typeof dramas }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800 }}>{title}</h3>
        <span style={{ color: 'var(--laranja)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Ver tudo</span>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {items.map((d) => <DramaCard key={d.titulo} {...d} />)}
      </div>
    </div>
  )
}

function HomeMobile() {
  return (
    <>
      <div style={{
        padding: '16px 20px', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center',
        background: 'var(--preto)', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1.5 }}>
          <span style={{ color: 'var(--branco)' }}>Dig</span>
          <span style={{ color: 'var(--laranja)' }}>Vue</span>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 22 }}>
          {['🔔', '🔍'].map((icon) => (
            <span key={icon} style={{
              cursor: 'pointer', width: 40, height: 40,
              background: 'var(--cinza-escuro)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{icon}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 20px 8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {['Tudo', 'Romance', 'Drama', 'Comédia', 'Suspense', 'Família'].map((c, i) => (
          <div key={c} style={{
            flexShrink: 0, padding: '8px 16px',
            background: i === 0 ? 'var(--laranja)' : 'var(--cinza-escuro)',
            color: 'var(--branco)', borderRadius: 20, fontSize: 14,
            fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{c}</div>
        ))}
      </div>

      <div style={{
        margin: '0 16px 24px', height: 220, borderRadius: 20,
        background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.95) 100%), linear-gradient(135deg, #4a1a0a 0%, #8b2f0e 50%, #d44a14 100%)',
        padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        <span style={{
          alignSelf: 'flex-start', padding: '4px 10px', background: 'var(--laranja)',
          fontSize: 11, fontWeight: 800, letterSpacing: 1, borderRadius: 4,
          textTransform: 'uppercase', marginBottom: 8,
        }}>⭐ Em Alta</span>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4, lineHeight: 1.1 }}>O Amor Secreto<br />do CEO</h2>
        <p style={{ color: 'var(--cinza-claro)', fontSize: 13, marginBottom: 12 }}>42 episódios • Romance</p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="botao-play">▶ Assistir</button>
          <button className="botao-add">+ Lista</button>
        </div>
      </div>

      <Section title="🔥 Em Alta" items={dramas} />
      <Section title="💝 Romance" items={romances} />
    </>
  )
}

function HomeDesktop() {
  const navItems = ['🏠 Início', '🔥 Em Alta', '💝 Romance', '🎭 Drama', '😂 Comédia', '🪙 Carteira', '💎 VIP', '⚙️ Ajustes']
  const cards = [...dramas, { titulo: 'Para Sempre', info: '⭐ 4.5 • 25 eps', cor: 'cor5' }]

  return (
    <div style={{ display: 'flex', minHeight: 600 }}>
      <aside style={{
        width: 220, background: 'var(--preto)',
        borderRight: '1px solid var(--cinza-escuro)', padding: '20px 12px', flexShrink: 0,
      }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, textAlign: 'center', marginBottom: 32, letterSpacing: 1.5 }}>
          <span style={{ color: 'var(--branco)' }}>Dig</span>
          <span style={{ color: 'var(--laranja)' }}>Vue</span>
        </div>
        {navItems.map((item, i) => (
          <div key={item} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            borderRadius: 10, marginBottom: 4, cursor: 'pointer',
            fontSize: 15, fontWeight: 600,
            background: i === 0 ? 'linear-gradient(90deg, var(--laranja), var(--laranja-escuro))' : 'transparent',
            color: i === 0 ? 'var(--branco)' : 'var(--cinza-claro)',
          }}>{item}</div>
        ))}
      </aside>
      <main style={{ flex: 1, padding: '24px 32px', background: 'var(--preto-suave)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--cinza-claro)' }}>🔍</span>
            <input style={{
              width: 320, padding: '10px 14px 10px 38px',
              background: 'var(--cinza-escuro)', border: '1px solid transparent',
              borderRadius: 10, color: 'var(--branco)', fontSize: 14,
            }} placeholder="Buscar dramas, séries..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--laranja), var(--laranja-escuro))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700,
            }}>M</div>
          </div>
        </div>

        <div style={{
          height: 280, borderRadius: 16, marginBottom: 28,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, transparent 60%), linear-gradient(135deg, #4a1a0a 0%, #8b2f0e 50%, #d44a14 100%)',
          padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <span style={{
            alignSelf: 'flex-start', padding: '4px 10px', background: 'var(--laranja)',
            fontSize: 11, fontWeight: 800, letterSpacing: 1, borderRadius: 4,
            textTransform: 'uppercase', marginBottom: 12,
          }}>⭐ Em Alta</span>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, maxWidth: '60%' }}>O Amor Secreto do CEO</h2>
          <p style={{ color: 'var(--cinza-claro)', fontSize: 14, marginBottom: 16 }}>42 episódios • Romance • ⭐ 4.9</p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="botao-play">▶ Assistir Agora</button>
            <button className="botao-add">+ Minha Lista</button>
          </div>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14 }}>🔥 Em Alta</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
          {cards.map((c) => (
            <div key={c.titulo} style={{ cursor: 'pointer' }}>
              <div className={c.cor} style={{ width: '100%', aspectRatio: '2/3', borderRadius: 10, marginBottom: 8 }} />
              <div style={{ fontSize: 14, fontWeight: 700 }}>{c.titulo}</div>
              <div style={{ fontSize: 12, color: 'var(--cinza-claro)' }}>{c.info}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default function HomeScreen() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular" hasBottomNav bottomNavActive="home">
        <HomeMobile />
      </PhoneMockup>

      <DesktopMockup label="💻 Computador">
        <HomeDesktop />
      </DesktopMockup>
    </div>
  )
}

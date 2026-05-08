import PhoneMockup from '../components/PhoneMockup'

const tendencias = [
  { n: 1, titulo: 'Casamento Falso', cat: 'Romance' },
  { n: 2, titulo: 'Lobo Alfa',       cat: 'Drama' },
  { n: 3, titulo: 'Vingança Doce',   cat: 'Suspense' },
  { n: 4, titulo: 'Filha Perdida',   cat: 'Família' },
  { n: 5, titulo: 'Príncipe Real',   cat: 'Romance' },
  { n: 6, titulo: 'Coração de Gelo', cat: 'Drama' },
]

const tags = [
  { label: 'Romance CEO', popular: true },
  { label: 'Casamento',   popular: false },
  { label: 'Vingança',    popular: false },
  { label: 'Lobo Alfa',   popular: true },
  { label: 'Família Rica',popular: false },
  { label: 'Princesa',    popular: false },
  { label: 'Mafia',       popular: false },
]

export default function BuscaScreen() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular" hasBottomNav bottomNavActive="busca">
        <div>
          <div style={{ padding: '16px 20px', background: 'var(--preto)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>🔍 Buscar</h2>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--cinza-claro)', fontSize: 18 }}>🔍</span>
              <input style={{
                width: '100%', padding: '14px 16px 14px 44px',
                background: 'var(--cinza-escuro)', border: '2px solid transparent',
                borderRadius: 12, color: 'var(--branco)', fontSize: 15,
              }} placeholder="Buscar drama, série, gênero..." />
            </div>
          </div>

          <h3 style={{ padding: '20px 20px 12px', fontSize: 16, fontWeight: 700 }}>🏷️ Buscas Populares</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 20px' }}>
            {tags.map(({ label, popular }) => (
              <span key={label} style={{
                padding: '8px 14px',
                background: popular
                  ? 'linear-gradient(90deg, var(--laranja-escuro), var(--laranja))'
                  : 'var(--cinza-escuro)',
                borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>{label}</span>
            ))}
          </div>

          <h3 style={{ padding: '20px 20px 12px', fontSize: 16, fontWeight: 700 }}>🔥 Tendências</h3>
          <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            {tendencias.map(({ n, titulo, cat }) => (
              <div key={n} style={{ display: 'flex', gap: 10, padding: 10, background: 'var(--cinza-escuro)', borderRadius: 12, cursor: 'pointer' }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: 'var(--laranja)', lineHeight: 1, width: 30 }}>{n}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{titulo}</div>
                  <div style={{ fontSize: 11, color: 'var(--cinza-claro)' }}>{cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PhoneMockup>
    </div>
  )
}

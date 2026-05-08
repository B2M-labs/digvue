import PhoneMockup from '../components/PhoneMockup'
import DesktopMockup from '../components/DesktopMockup'

function SplashContent({ logoSize = 72, taglineSize = 16, tagline = 'Mini Dramas' }) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 26, 0.2) 0%, transparent 60%), var(--preto)',
    }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: logoSize,
        letterSpacing: 3,
        lineHeight: 1,
        marginBottom: 16,
        animation: 'pulse 2s ease-in-out infinite',
      }}>
        <span style={{ color: 'var(--branco)' }}>Dig</span>
        <span style={{ color: 'var(--laranja)' }}>Vue</span>
      </div>
      <div style={{
        color: 'var(--cinza-claro)',
        fontSize: taglineSize,
        letterSpacing: 4,
        textTransform: 'uppercase',
        marginBottom: 60,
      }}>
        {tagline}
      </div>
      <div style={{
        width: 200,
        height: 4,
        background: 'var(--cinza-escuro)',
        borderRadius: 4,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: '60%',
          background: 'linear-gradient(90deg, var(--laranja-escuro), var(--laranja))',
          borderRadius: 4,
          animation: 'loading 1.5s ease-in-out infinite',
        }} />
      </div>
    </div>
  )
}

export default function SplashScreen() {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneMockup label="📱 Celular">
        <SplashContent />
      </PhoneMockup>

      <DesktopMockup label="💻 Computador">
        <div style={{ height: 600 }}>
          <SplashContent logoSize={120} taglineSize={20} tagline="Mini Dramas Premium" />
        </div>
      </DesktopMockup>
    </div>
  )
}

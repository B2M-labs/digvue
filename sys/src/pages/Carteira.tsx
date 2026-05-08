import { Coins, Gem, ShoppingBag, History } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useUser } from '../context/UserContext'

const pacotes: { Icon: LucideIcon; moedas: string; bonus: string; preco: string; popular: boolean }[] = [
  { Icon: Coins, moedas: '100',  bonus: 'moedas',      preco: 'R$ 9,90',   popular: false },
  { Icon: Coins, moedas: '500',  bonus: '+50 bônus',   preco: 'R$ 39,90',  popular: true  },
  { Icon: Coins, moedas: '1000', bonus: '+200 bônus',  preco: 'R$ 79,90',  popular: false },
  { Icon: Gem,   moedas: '5000', bonus: '+1500 bônus', preco: 'R$ 299,90', popular: false },
]

export default function Carteira() {
  const { saldo, historico } = useUser()

  return (
    <div className="page">
      <div style={{ padding: '20px var(--page-padding) 8px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Coins size={22} /> Minha Carteira
        </h2>
      </div>

      {/* Saldo */}
      <div style={{
        margin: '12px var(--page-padding) 24px',
        background: 'linear-gradient(135deg, var(--laranja) 0%, var(--laranja-escuro) 100%)',
        borderRadius: 20, padding: 24,
        boxShadow: '0 12px 32px rgba(255, 107, 26, 0.25)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160,
          background: 'rgba(255,255,255,0.08)', borderRadius: '50%',
        }} />
        <div style={{ fontSize: 12, opacity: 0.9, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          Saldo Atual
        </div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 54, lineHeight: 1, marginBottom: 4 }}>
          {saldo.toLocaleString('pt-BR')}
        </div>
        <div style={{ fontSize: 13, opacity: 0.9 }}>moedas DigVue</div>
      </div>

      {/* Pacotes */}
      <h3 style={{ padding: '0 var(--page-padding) 12px', fontSize: 17, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}>
        <ShoppingBag size={17} /> Comprar Moedas
      </h3>
      <div style={{ padding: '0 var(--page-padding)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {pacotes.map(({ Icon, moedas, bonus, preco, popular }) => (
          <div key={moedas} style={{
            background: 'var(--cinza-escuro)',
            border: `2px solid ${popular ? 'var(--laranja)' : 'transparent'}`,
            borderRadius: 16, padding: 16, textAlign: 'center', cursor: 'pointer', position: 'relative',
          }}>
            {popular && (
              <span style={{
                position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                background: 'var(--laranja)', padding: '3px 10px', borderRadius: 6,
                fontSize: 10, fontWeight: 800, letterSpacing: 1,
              }}>POPULAR</span>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--laranja)' }}>
              <Icon size={26} />
            </div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 34, color: 'var(--laranja)', lineHeight: 1, margin: '8px 0 4px',
            }}>{moedas}</div>
            <div style={{ fontSize: 11, color: 'var(--cinza-claro)', marginBottom: 12 }}>{bonus}</div>
            <div style={{ background: 'var(--preto)', padding: '8px', borderRadius: 8, fontWeight: 700, fontSize: 13 }}>
              {preco}
            </div>
          </div>
        ))}
      </div>

      {/* Histórico */}
      <h3 style={{ padding: '24px var(--page-padding) 12px', fontSize: 17, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 7 }}>
        <History size={17} /> Histórico
      </h3>
      <div style={{ padding: '0 var(--page-padding)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {historico.map(({ info, data, valor, pos }, i) => (
          <div key={i} style={{
            padding: 14, background: 'var(--cinza-escuro)', borderRadius: 12,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{info}</div>
              <div style={{ fontSize: 11, color: 'var(--cinza-claro)', marginTop: 2 }}>{data}</div>
            </div>
            <div style={{ fontWeight: 700, color: pos ? '#4ade80' : '#f87171' }}>{valor}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

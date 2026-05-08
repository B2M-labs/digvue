import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Crown, Calendar, Star, Gem, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const beneficios = [
  'Todos os episódios liberados',
  'Sem anúncios',
  'Conteúdo exclusivo',
  'Qualidade HD',
  'Download offline',
]

const planos: { Icon: LucideIcon; nome: string; eco: string; preco: string; periodo: string; id: string }[] = [
  { Icon: Calendar, nome: 'Mensal',    eco: 'Comece agora',     preco: 'R$ 19,90', periodo: '/mês',  id: 'mensal' },
  { Icon: Star,     nome: 'Anual',     eco: 'Economize 60%!',   preco: 'R$ 99,90', periodo: '/ano',  id: 'anual' },
  { Icon: Gem,      nome: 'Vitalício', eco: 'Pague uma vez só', preco: 'R$ 299',   periodo: 'único', id: 'vitalicio' },
]

export default function Vip() {
  const [planoSel, setPlanoSel] = useState('anual')
  const navigate = useNavigate()

  return (
    <div className="page">
      <div style={{ padding: '0 var(--page-padding)' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: 16, background: 'none', border: 'none',
            color: 'var(--cinza-claro)', fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        <div style={{ textAlign: 'center', color: 'var(--laranja)', margin: '12px 0 8px', display: 'flex', justifyContent: 'center' }}>
          <Crown size={60} />
        </div>
        <h1 style={{
          textAlign: 'center',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 36, letterSpacing: 2, color: 'var(--laranja)', marginBottom: 4,
        }}>DigVue VIP</h1>
        <p style={{ textAlign: 'center', color: 'var(--cinza-claro)', fontSize: 14, marginBottom: 24 }}>
          Assista tudo sem limites
        </p>

        {/* Benefícios */}
        <div style={{ background: 'var(--cinza-escuro)', borderRadius: 16, padding: '8px 16px', marginBottom: 20 }}>
          {beneficios.map((b) => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
              <div style={{
                width: 24, height: 24, background: 'var(--laranja)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                color: 'var(--branco)',
              }}>
                <Check size={13} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Planos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {planos.map(({ Icon, nome, eco, preco, periodo, id }) => {
            const sel = planoSel === id
            return (
              <button
                key={id}
                onClick={() => setPlanoSel(id)}
                style={{
                  background: sel
                    ? 'linear-gradient(135deg, rgba(255,107,26,0.12) 0%, var(--cinza-escuro) 100%)'
                    : 'var(--cinza-escuro)',
                  border: `2px solid ${sel ? 'var(--laranja)' : 'var(--cinza-medio)'}`,
                  borderRadius: 16, padding: 16, cursor: 'pointer', textAlign: 'left',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--branco)', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <Icon size={16} color="var(--laranja)" /> {nome}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--laranja)', marginTop: 2 }}>{eco}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 26, color: 'var(--laranja)', lineHeight: 1,
                    }}>{preco}</div>
                    <div style={{ fontSize: 11, color: 'var(--cinza-claro)' }}>{periodo}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <button style={{
          width: '100%', padding: 16,
          background: 'linear-gradient(90deg, var(--laranja-escuro), var(--laranja))',
          border: 'none', borderRadius: 12,
          color: 'var(--branco)', fontSize: 16, fontWeight: 700,
          boxShadow: '0 8px 24px rgba(255,107,26,0.3)',
          marginBottom: 12, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Assinar {planos.find((p) => p.id === planoSel)?.nome} VIP <Crown size={16} />
        </button>
        <p style={{ textAlign: 'center', color: 'var(--cinza-claro)', fontSize: 11, paddingBottom: 8 }}>
          Cancele quando quiser. Sem fidelidade.
        </p>
      </div>
    </div>
  )
}

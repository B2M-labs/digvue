import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { VMark } from './Logo'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LangContext'
import { formatMoeda, moedasDeCashback } from '../data/checkout'
import type { Produto } from '../data/produtos'

type Props = {
  produtos: Produto[]
  /** quadro da cena, usado como miniatura recortada do produto */
  img: string
  dramaId: string
  dramaTitulo: { pt: string; en: string }
  ep: number
  /** marcadores ficam um pouco mais visíveis quando a UI do player está aberta */
  realcar: boolean
}

type Toast = { id: string; titulo: string; preco: string; moedas: number }

/**
 * Camada de marcadores sobre o vídeo. Cada produto da cena recebe o "V" do
 * logo, discreto, na coordenada do elemento. Um toque adiciona ao carrinho.
 */
export default function SceneHotspots({
  produtos, img, dramaId, dramaTitulo, ep, realcar,
}: Props) {
  const { adicionar, temNoCarrinho } = useCart()
  const { lang, t } = useLang()
  const [aberto, setAberto] = useState<string | null>(null)
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  // fecha o rótulo ao trocar de episódio
  useEffect(() => { setAberto(null) }, [dramaId, ep])

  // o rótulo é só confirmação visual: fecha sozinho
  useEffect(() => {
    if (!aberto) return
    const timer = setTimeout(() => setAberto(null), 2000)
    return () => clearTimeout(timer)
  }, [aberto])

  /** Um toque adiciona direto ao carrinho e mostra o que entrou. */
  function onToque(p: Produto) {
    adicionar({
      id: p.id,
      titulo: p.titulo,
      marca: p.marca,
      preco: p.preco,
      img,
      spot: p.spot,
      zoom: p.zoom ?? 260,
      dramaId,
      dramaTitulo,
      ep,
    })
    setToast({
      id: p.id,
      titulo: p.titulo[lang],
      preco: formatMoeda(p.preco[lang], lang),
      moedas: moedasDeCashback(p.preco[lang], lang),
    })
    setAberto(p.id)
  }

  if (produtos.length === 0) return null

  return (
    <>
      {/* camada transparente aos cliques, exceto nos marcadores */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 25, pointerEvents: 'none' }}>
        {produtos.map((p) => {
          const noCarrinho = temNoCarrinho(p.id)
          const ativo = aberto === p.id
          // rótulo abre para a esquerda quando o marcador está na metade direita
          const paraEsquerda = p.spot.x > 55

          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.spot.x}%`,
                top: `${p.spot.y}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto',
              }}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`${p.titulo[lang]} — ${formatMoeda(p.preco[lang], lang)}`}
                onClick={(e) => { e.stopPropagation(); onToque(p) }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToque(p) }
                }}
                style={{
                  width: 34,
                  height: 34,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  background: ativo || noCarrinho
                    ? 'rgba(255,107,26,0.92)'
                    : 'radial-gradient(circle, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0) 72%)',
                  border: ativo
                    ? '1px solid rgba(255,255,255,0.85)'
                    : '1px solid transparent',
                  opacity: ativo || noCarrinho ? 1 : realcar ? 0.72 : 0.5,
                  transform: ativo ? 'scale(1.12)' : 'scale(1)',
                  transition: 'opacity 0.25s, transform 0.2s, background 0.2s',
                  animation: ativo || noCarrinho ? 'none' : 'dvBreath 3.4s ease-in-out infinite',
                  filter: ativo || noCarrinho
                    ? 'drop-shadow(0 3px 10px rgba(255,107,26,0.55))'
                    : 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))',
                }}
              >
                {noCarrinho && !ativo
                  ? <Check size={15} strokeWidth={3.2} color="#FFFFFF" />
                  : <VMark size={16} color={ativo ? '#FFFFFF' : 'var(--laranja)'} pupil={ativo ? '#FF6B1A' : '#17334D'} />
                }
              </div>

              {/* rótulo de confirmação — mostra o que acabou de entrar no carrinho */}
              {ativo && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    [paraEsquerda ? 'right' : 'left']: 40,
                    transform: 'translateY(-50%)',
                    minWidth: 168,
                    maxWidth: 210,
                    padding: '9px 11px',
                    background: 'rgba(10,10,10,0.93)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,107,26,0.45)',
                    borderRadius: 12,
                    cursor: 'pointer',
                    animation: 'dvPop 0.18s ease-out',
                    boxShadow: '0 10px 28px rgba(0,0,0,0.6)',
                  }}
                >
                  <div style={{ fontSize: 9, color: 'var(--cinza-claro)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>
                    {p.marca}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>
                    {p.titulo[lang]}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--laranja)' }}>
                      {formatMoeda(p.preco[lang], lang)}
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 800, padding: '4px 8px',
                      background: 'var(--laranja)', borderRadius: 6, whiteSpace: 'nowrap',
                      display: 'inline-flex', alignItems: 'center', gap: 3,
                    }}>
                      <Check size={10} strokeWidth={3.5} /> {t('shop_added')}
                    </span>
                  </div>
                  <div style={{ fontSize: 10, color: '#4ade80', marginTop: 5, fontWeight: 600 }}>
                    +{moedasDeCashback(p.preco[lang], lang)} {t('shop_coins_back')}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* confirmação de item adicionado */}
      {toast && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            left: 16, right: 16, bottom: 96,
            zIndex: 40,
            padding: '11px 14px',
            background: 'rgba(20,20,20,0.96)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,107,26,0.5)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', gap: 11,
            animation: 'dvSlideUp 0.24s ease-out',
            boxShadow: '0 12px 32px rgba(0,0,0,0.55)',
          }}
        >
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: 'var(--laranja)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Check size={16} strokeWidth={3} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 12, fontWeight: 700,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {toast.titulo}
            </div>
            <div style={{ fontSize: 11, color: 'var(--cinza-claro)' }}>
              {toast.preco} • <span style={{ color: '#4ade80', fontWeight: 700 }}>
                +{toast.moedas} {t('shop_coins_back')}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

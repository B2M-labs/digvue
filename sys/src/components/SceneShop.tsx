import { useEffect, useState } from 'react'
import { X, Plus, Minus, Check } from 'lucide-react'
import { VMark } from './Logo'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LangContext'
import { formatMoeda } from '../data/checkout'
import { recorteDaCena, type Produto } from '../data/produtos'

type Props = {
  open: boolean
  onClose: () => void
  produtos: Produto[]
  /** quadro da cena, usado como miniatura recortada do produto */
  img: string
  dramaId: string
  dramaTitulo: { pt: string; en: string }
  ep: number
}

/**
 * Lista de produtos do episódio, aberta a partir do V fixo no topo do
 * player. Cada linha adiciona ao carrinho com um toque — sem precisar
 * caçar marcadores espalhados pela cena em movimento.
 */
export default function SceneShop({
  open, onClose, produtos, img, dramaId, dramaTitulo, ep,
}: Props) {
  const { itens, adicionar, alterarQtd } = useCart()
  const { lang, t } = useLang()
  const [recemAdicionado, setRecemAdicionado] = useState<string | null>(null)

  useEffect(() => {
    if (!recemAdicionado) return
    const timer = setTimeout(() => setRecemAdicionado(null), 1100)
    return () => clearTimeout(timer)
  }, [recemAdicionado])

  function onComprar(p: Produto) {
    adicionar({
      id: p.id,
      titulo: p.titulo,
      marca: p.marca,
      preco: p.preco,
      img: p.img ?? img,
      spot: p.spot,
      zoom: p.zoom ?? 260,
      dramaId,
      dramaTitulo,
      ep,
    })
    setRecemAdicionado(p.id)
  }

  if (!open) return null

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 480, maxHeight: '80dvh',
          background: 'var(--preto)',
          borderRadius: '20px 20px 0 0',
          display: 'flex', flexDirection: 'column',
          animation: 'dvSlideUp 0.26s ease-out',
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 16px 12px',
          borderBottom: '1px solid var(--cinza-escuro)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'rgba(255,107,26,0.16)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <VMark size={14} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 800 }}>{t('shop_list_title')}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--cinza-escuro)', border: 'none', borderRadius: '50%',
              width: 28, height: 28, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--branco)', cursor: 'pointer',
            }}
          >
            <X size={14} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 16px 16px' }}>
          {produtos.map((p) => {
            const qtd = itens.find((i) => i.id === p.id)?.qtd ?? 0
            const ativo = recemAdicionado === p.id
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex', gap: 12, alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--cinza-escuro)',
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 10, flexShrink: 0,
                  position: 'relative', overflow: 'hidden',
                  ...recorteDaCena(p.img ?? img, p.spot, p.zoom),
                }}>
                  {qtd > 0 && (
                    <div style={{
                      position: 'absolute', bottom: 2, right: 2,
                      width: 16, height: 16, borderRadius: '50%',
                      background: '#4ade80',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={10} strokeWidth={3.5} color="#0A0A0A" />
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9, color: 'var(--cinza-claro)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
                    {p.marca}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, margin: '2px 0 3px', lineHeight: 1.3 }}>
                    {p.titulo[lang]}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--laranja)' }}>
                    {formatMoeda(p.preco[lang], lang)}
                  </div>
                </div>

                {qtd > 0 ? (
                  <div style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: 2,
                    background: ativo ? 'rgba(74,222,128,0.16)' : 'var(--cinza-escuro)',
                    border: `1px solid ${ativo ? '#4ade80' : 'var(--cinza-medio)'}`,
                    borderRadius: 10, padding: 3,
                    transition: 'background 0.2s, border-color 0.2s',
                  }}>
                    <button
                      onClick={() => alterarQtd(p.id, -1)}
                      aria-label={`${t('cart_less')} — ${p.titulo[lang]}`}
                      style={stepBtn}
                    >
                      <Minus size={13} strokeWidth={3} />
                    </button>
                    <span style={{ fontSize: 13, fontWeight: 800, minWidth: 20, textAlign: 'center' }}>
                      {qtd}
                    </span>
                    <button
                      onClick={() => onComprar(p)}
                      aria-label={`${t('shop_add_btn')} — ${p.titulo[lang]}`}
                      style={stepBtn}
                    >
                      <Plus size={13} strokeWidth={3} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onComprar(p)}
                    aria-label={`${t('shop_add_btn')} — ${p.titulo[lang]}`}
                    style={{
                      flexShrink: 0,
                      padding: '9px 13px',
                      background: 'var(--laranja)',
                      border: 'none',
                      borderRadius: 10,
                      color: 'var(--branco)',
                      fontSize: 12, fontWeight: 800, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}
                  >
                    <Plus size={13} strokeWidth={3} /> {t('shop_add_btn')}
                  </button>
                )}
              </div>
            )
          })}

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginTop: 12, fontSize: 10.5, color: 'var(--cinza-claro)',
          }}>
            {t('shop_coins_note')}
          </div>
        </div>
      </div>
    </div>
  )
}

const stepBtn = {
  width: 24, height: 24, borderRadius: 7,
  background: 'var(--cinza-medio)', border: 'none',
  color: 'var(--branco)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
} as const

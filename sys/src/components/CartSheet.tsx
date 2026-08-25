import { useState } from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag, Coins, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LangContext'
import { formatMoeda, moedasDeCashback, episodiosDeMoedas } from '../data/checkout'
import { recorteDaCena } from '../data/produtos'
import Checkout from './Checkout'
import { VMark } from './Logo'

export default function CartSheet({ onClose }: { onClose: () => void }) {
  const { itens, quantidade, alterarQtd, remover, subtotal } = useCart()
  const { lang, t } = useLang()
  const [emCheckout, setEmCheckout] = useState(false)

  const total = subtotal(lang)
  const moedas = moedasDeCashback(total, lang)
  const { inteiros } = episodiosDeMoedas(moedas)

  if (emCheckout) {
    return <Checkout onClose={onClose} onVoltar={() => setEmCheckout(false)} />
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.62)',
        backdropFilter: 'blur(2px)',
        display: 'flex', justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: 0,
          width: '100%', maxWidth: 480,
          maxHeight: '88dvh',
          background: 'var(--preto-suave)',
          borderRadius: '22px 22px 0 0',
          display: 'flex', flexDirection: 'column',
          animation: 'dvSlideUp 0.26s ease-out',
        }}
      >
        {/* cabeçalho */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 20px 14px',
          borderBottom: '1px solid var(--cinza-escuro)',
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShoppingBag size={18} /> {t('cart_title')}
            </div>
            <div style={{ fontSize: 12, color: 'var(--cinza-claro)', marginTop: 3 }}>
              {quantidade} {quantidade === 1 ? t('cart_item') : t('cart_items')}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--cinza-escuro)', border: 'none', borderRadius: '50%',
              width: 32, height: 32, display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--branco)', cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* itens */}
        {itens.length === 0 ? (
          <div style={{ padding: '48px 32px 56px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14, opacity: 0.5 }}>
              <VMark size={44} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{t('cart_empty')}</div>
            <p style={{ fontSize: 13, color: 'var(--cinza-claro)', lineHeight: 1.5 }}>
              {t('cart_empty_desc')}
            </p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px' }}>
              {itens.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--cinza-escuro)',
                  }}
                >
                  {/* miniatura = recorte da própria cena */}
                  <div style={{
                    width: 62, height: 62, borderRadius: 10, flexShrink: 0,
                    position: 'relative', overflow: 'hidden',
                    ...recorteDaCena(item.img, item.spot, item.zoom),
                  }}>
                    <div style={{
                      position: 'absolute', bottom: 3, right: 3,
                      width: 16, height: 16, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <VMark size={9} />
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 9, color: 'var(--cinza-claro)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
                      {item.marca}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, margin: '2px 0 3px', lineHeight: 1.3 }}>
                      {item.titulo[lang]}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--cinza-claro)', marginBottom: 6 }}>
                      {item.dramaTitulo[lang]} • Ep {item.ep}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 2,
                        background: 'var(--cinza-escuro)', borderRadius: 8, padding: 2,
                      }}>
                        <button
                          onClick={() => alterarQtd(item.id, -1)}
                          aria-label={t('cart_less')}
                          style={qtdBtn}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: 12, fontWeight: 700, minWidth: 18, textAlign: 'center' }}>
                          {item.qtd}
                        </span>
                        <button
                          onClick={() => alterarQtd(item.id, 1)}
                          aria-label={t('cart_more')}
                          style={qtdBtn}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--laranja)' }}>
                        {formatMoeda(item.preco[lang] * item.qtd, lang)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => remover(item.id)}
                    aria-label={t('cart_remove')}
                    style={{
                      background: 'none', border: 'none', color: 'var(--cinza-claro)',
                      cursor: 'pointer', padding: 6, flexShrink: 0,
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* rodapé: total, cashback e checkout */}
            <div style={{
              padding: '14px 20px calc(20px + env(safe-area-inset-bottom))',
              borderTop: '1px solid var(--cinza-escuro)',
              background: 'var(--preto)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '10px 12px', marginBottom: 12,
                background: 'rgba(74,222,128,0.09)',
                border: '1px solid rgba(74,222,128,0.28)',
                borderRadius: 11,
              }}>
                <Coins size={17} color="#4ade80" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: 11.5, lineHeight: 1.45 }}>
                  <span style={{ fontWeight: 800, color: '#4ade80' }}>
                    +{moedas} {t('cart_coins_unit')}
                  </span>{' '}
                  <span style={{ color: 'var(--cinza-claro)' }}>
                    {inteiros >= 1
                      ? t('cart_coins_eps').replace('{n}', String(inteiros))
                      : t('cart_coins_hint')}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                marginBottom: 12,
              }}>
                <span style={{ fontSize: 13, color: 'var(--cinza-claro)' }}>{t('cart_subtotal')}</span>
                <span style={{ fontSize: 22, fontWeight: 800 }}>{formatMoeda(total, lang)}</span>
              </div>

              <button
                onClick={() => setEmCheckout(true)}
                style={{
                  width: '100%', padding: 15,
                  background: 'var(--laranja)', border: 'none', borderRadius: 13,
                  color: 'var(--branco)', fontSize: 15, fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: '0 8px 22px rgba(255,107,26,0.32)',
                }}
              >
                {t('cart_checkout')} <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const qtdBtn = {
  width: 24, height: 24, borderRadius: 6,
  background: 'var(--cinza-medio)', border: 'none',
  color: 'var(--branco)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
} as const

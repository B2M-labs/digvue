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
          padding: '14px 16px 12px',
          borderBottom: '1px solid var(--cinza-escuro)',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShoppingBag size={16} /> {t('cart_title')}
            </div>
            <div style={{ fontSize: 11, color: 'var(--cinza-claro)', marginTop: 2 }}>
              {quantidade} {quantidade === 1 ? t('cart_item') : t('cart_items')}
            </div>
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

        {/* itens */}
        {itens.length === 0 ? (
          <div style={{ padding: '40px 28px 46px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, opacity: 0.5 }}>
              <VMark size={36} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{t('cart_empty')}</div>
            <p style={{ fontSize: 12, color: 'var(--cinza-claro)', lineHeight: 1.5 }}>
              {t('cart_empty_desc')}
            </p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px 16px' }}>
              {itens.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', gap: 10, alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--cinza-escuro)',
                  }}
                >
                  {/* miniatura = recorte da própria cena */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 9, flexShrink: 0,
                    position: 'relative', overflow: 'hidden',
                    ...recorteDaCena(item.img, item.spot, item.zoom),
                  }}>
                    <div style={{
                      position: 'absolute', bottom: 2, right: 2,
                      width: 14, height: 14, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <VMark size={8} />
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 8.5, color: 'var(--cinza-claro)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
                      {item.marca}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, margin: '2px 0 3px', lineHeight: 1.3 }}>
                      {item.titulo[lang]}
                    </div>
                    <div style={{ fontSize: 9.5, color: 'var(--cinza-claro)', marginBottom: 5 }}>
                      {item.dramaTitulo[lang]} • Ep {item.ep}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 2,
                        background: 'var(--cinza-escuro)', borderRadius: 7, padding: 2,
                      }}>
                        <button
                          onClick={() => alterarQtd(item.id, -1)}
                          aria-label={t('cart_less')}
                          style={qtdBtn}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: 11.5, fontWeight: 700, minWidth: 16, textAlign: 'center' }}>
                          {item.qtd}
                        </span>
                        <button
                          onClick={() => alterarQtd(item.id, 1)}
                          aria-label={t('cart_more')}
                          style={qtdBtn}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--laranja)' }}>
                        {formatMoeda(item.preco[lang] * item.qtd, lang)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => remover(item.id)}
                    aria-label={t('cart_remove')}
                    style={{
                      background: 'none', border: 'none', color: 'var(--cinza-claro)',
                      cursor: 'pointer', padding: 5, flexShrink: 0,
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* rodapé: total, cashback e checkout */}
            <div style={{
              padding: '12px 16px calc(16px + env(safe-area-inset-bottom))',
              borderTop: '1px solid var(--cinza-escuro)',
              background: 'var(--preto)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 11px', marginBottom: 10,
                background: 'rgba(74,222,128,0.09)',
                border: '1px solid rgba(74,222,128,0.28)',
                borderRadius: 10,
              }}>
                <Coins size={15} color="#4ade80" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: 11, lineHeight: 1.4 }}>
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
                marginBottom: 10,
              }}>
                <span style={{ fontSize: 12, color: 'var(--cinza-claro)' }}>{t('cart_subtotal')}</span>
                <span style={{ fontSize: 19, fontWeight: 800 }}>{formatMoeda(total, lang)}</span>
              </div>

              <button
                onClick={() => setEmCheckout(true)}
                style={{
                  width: '100%', padding: 13,
                  background: 'var(--laranja)', border: 'none', borderRadius: 12,
                  color: 'var(--branco)', fontSize: 14, fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  boxShadow: '0 8px 22px rgba(255,107,26,0.32)',
                }}
              >
                {t('cart_checkout')} <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const qtdBtn = {
  width: 22, height: 22, borderRadius: 6,
  background: 'var(--cinza-medio)', border: 'none',
  color: 'var(--branco)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
} as const

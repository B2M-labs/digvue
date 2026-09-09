import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LangContext'
import { formatMoeda, moedasDeCashback } from '../data/checkout'
import { visivelEm, posicaoEm, type Produto } from '../data/produtos'

type Props = {
  produtos: Produto[]
  /** quadro padrão da cena (poster do episódio), usado quando o produto não tem `img` próprio */
  img: string
  dramaId: string
  dramaTitulo: { pt: string; en: string }
  ep: number
  /** tempo atual do vídeo (segundos) — só ativa o toque no objeto na janela em que ele é visível */
  tempoVideo: number
  /** avisa o player pra piscar o V como confirmação (o vídeo nunca pausa) */
  onAdicionar: () => void
}

type Toast = { id: string; titulo: string; preco: string; moedas: number }

/**
 * Áreas de toque invisíveis sobre os objetos reais da cena (a própria
 * camisa, a cortina...). Tocar em qualquer parte da área adiciona ao
 * carrinho direto, sem pausar o vídeo — o V no topo é quem chama atenção
 * para o que está "no ar" no momento, não um marcador na cena.
 */
export default function SceneHotspots({
  produtos, img, dramaId, dramaTitulo, ep, tempoVideo, onAdicionar,
}: Props) {
  const { adicionar } = useCart()
  const { lang, t } = useLang()
  const [toast, setToast] = useState<Toast | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  function onToque(p: Produto) {
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
    setToast({
      id: p.id,
      titulo: p.titulo[lang],
      preco: formatMoeda(p.preco[lang], lang),
      moedas: moedasDeCashback(p.preco[lang], lang),
    })
    onAdicionar()
  }

  return (
    <>
      {/*
        pointerEvents 'none' no container cheio de tela — só as áreas de
        toque individuais (abaixo) voltam a aceitar clique. Sem isso, essa
        camada bloquearia toda a UI do player (carrinho, voltar, barra de
        progresso) mesmo fora das áreas de produto.
        zIndex acima da UI do player (topo, ações laterais, painel de
        info usam 20-21) — em alguns tamanhos de tela essas áreas de
        toque caem por cima de ícones sem função real (comentar,
        compartilhar); priorizamos a compra, que é a ação que importa.
      */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 22, pointerEvents: 'none' }}>
        {produtos.map((p) => {
          if (!visivelEm(p, tempoVideo)) return null
          const pos = posicaoEm(p, tempoVideo)
          return (
            <div
              key={p.id}
              role="button"
              tabIndex={0}
              aria-label={`${t('shop_add_btn')} — ${p.titulo[lang]}`}
              onClick={(e) => { e.stopPropagation(); onToque(p) }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onToque(p) }
              }}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                // nunca deixa a área de toque subir por cima do botão de
                // voltar / topo fixo, mesmo em telas baixas
                top: `max(${pos.y}%, 132px)`,
                transform: 'translate(-50%, -50%)',
                width: 150,
                height: 190,
                cursor: 'pointer',
                pointerEvents: 'auto',
              }}
            />
          )
        })}
      </div>

      {/* confirmação de item adicionado — some sozinha, vídeo continua rodando */}
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

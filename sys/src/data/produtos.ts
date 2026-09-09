import type { Lang } from './i18n'

export type Preco = Record<Lang, number>

export type Produto = {
  id: string
  titulo: { pt: string; en: string }
  marca: string
  preco: Preco
  /** posição do marcador sobre o quadro do vídeo, em % (0-100) — usada para
   * recortar a miniatura do produto (o item mostrado é o próprio quadro) */
  spot: { x: number; y: number }
  /** zoom do recorte da cena usado como miniatura do produto (default 260%) */
  zoom?: number
  /**
   * Frame próprio do produto, quando o objeto não aparece no poster padrão
   * do episódio (`episodios.ts` thumb) — ex: um item que só fica visível
   * depois dos primeiros segundos do vídeo. `spot` é sempre relativo a
   * essa imagem quando ela existe. Sem isso, usa o poster do episódio.
   */
  img?: string
  /**
   * Janelas de tempo (em segundos do vídeo) em que o objeto está de fato
   * visível na coordenada de `spot` — conferido quadro a quadro contra o
   * vídeo real, não estimado. Fora dessas janelas o item não é clicável
   * diretamente na cena (continua na lista do V, só não tem hotspot no
   * vídeo). Sem essa lista, o hotspot vale o episódio inteiro (cena
   * estática, câmera fixa).
   */
  visivel?: [number, number][]
}

/**
 * Produtos do episódio, exibidos na lista que abre ao tocar no V fixo no
 * topo do player. A miniatura de cada item é o próprio recorte ampliado
 * do quadro em `spot` — o item mostrado é literalmente o item visto na
 * cena, então cada `spot` foi conferido manualmente contra o frame real
 * do vídeo (poster do Pexels usado em `episodios.ts`) antes de entrar
 * aqui. Os vídeos são footage de stock, sem relação com o roteiro, então
 * a maioria dos episódios não tem nada "vendável" identificável e fica
 * de fora até termos vídeo próprio (produzido) ou um novo poster que
 * sustente um produto real. Antes de adicionar um novo episódio aqui,
 * baixe o `thumb` do episódio e confirme visualmente que o objeto está
 * mesmo naquela coordenada — não estime a posição de memória.
 */
export const produtosPorEpisodio: Record<string, Produto[]> = {
  // ── Casamento Falso — ep 1: casal enrolado numa camisa azul, cortina
  // ao fundo (vídeo Pexels 9497521). É um plano dinâmico (câmera na mão) —
  // cada `visivel` foi conferido a cada 0.25-1s contra o vídeo real:
  // camisa dele estável 0-40s; cortina em dois trechos, 5-10s e 20-38s;
  // camisa branca dela só aparece depois dos 29s (antes disso está coberta
  // pelo abraço) e segue estável até ~38s — por isso usa um frame próprio
  // (`img`) em vez do poster do episódio, que não mostra a peça.
  '1-1': [
    {
      id: 'p-cf1-camisa-oxford',
      titulo: { pt: 'Camisa Oxford azul claro', en: 'Light Blue Oxford Shirt' },
      marca: 'Atelier Norte',
      preco: { pt: 189.9, en: 49.9 },
      spot: { x: 40, y: 78 },
      visivel: [[0, 40]],
    },
    {
      id: 'p-cf1-cortina',
      titulo: { pt: 'Cortina voil off-white', en: 'Off-White Sheer Curtain' },
      marca: 'Casa Vivo',
      preco: { pt: 319.9, en: 84.9 },
      spot: { x: 12, y: 20 },
      visivel: [[5, 10], [20, 38]],
    },
    {
      id: 'p-cf1-camisa-atriz',
      titulo: { pt: 'Camisa branca oversized', en: 'Oversized White Shirt' },
      marca: 'Linha Clara',
      preco: { pt: 149.9, en: 39.9 },
      spot: { x: 90, y: 70 },
      img: '/assets/thumbnails/cf1-camisa-atriz.jpg',
      visivel: [[29, 38]],
    },
  ],

  // ── Príncipe Real — ep 1: retrato de estúdio, blazer off-white sobre
  // blusa lavanda canelada (vídeo Pexels 5944901).
  '7-1': [
    {
      id: 'p-pr1-blazer',
      titulo: { pt: 'Blazer alfaiataria off-white', en: 'Off-White Tailored Blazer' },
      marca: 'Atelier Norte',
      preco: { pt: 459.9, en: 119.9 },
      spot: { x: 78, y: 55 },
    },
    {
      id: 'p-pr1-blusa',
      titulo: { pt: 'Blusa canelada lavanda', en: 'Lavender Ribbed Top' },
      marca: 'Maison Ivo',
      preco: { pt: 179.9, en: 46.9 },
      spot: { x: 48, y: 60 },
    },
  ],
}

export function getProdutos(dramaId: string, ep: number): Produto[] {
  return produtosPorEpisodio[`${dramaId}-${ep}`] ?? []
}

/** Sem `visivel`, o hotspot vale o episódio inteiro (cena estática). */
export function visivelEm(produto: Produto, tempo: number): boolean {
  if (!produto.visivel) return true
  return produto.visivel.some(([ini, fim]) => tempo >= ini && tempo <= fim)
}

/**
 * Estilo do recorte da cena usado como miniatura do produto:
 * amplia o quadro e centraliza na coordenada do marcador.
 */
export function recorteDaCena(img: string, spot: { x: number; y: number }, zoom = 260) {
  return {
    backgroundImage: `url(${img})`,
    backgroundSize: `${zoom}%`,
    backgroundPosition: `${spot.x}% ${spot.y}%`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'var(--cinza-escuro)',
  } as const
}

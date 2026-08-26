import type { Lang } from './i18n'

export type Preco = Record<Lang, number>

export type Produto = {
  id: string
  titulo: { pt: string; en: string }
  marca: string
  preco: Preco
  /** posição do marcador sobre o quadro do vídeo, em % (0-100) */
  spot: { x: number; y: number }
  /** zoom do recorte da cena usado como miniatura do produto (default 260%) */
  zoom?: number
  /**
   * Janelas de tempo (em segundos do vídeo) em que o item está de fato
   * visível naquela coordenada — conferido quadro a quadro contra o vídeo
   * real, não estimado. Fora dessas janelas o marcador some. Sem essa
   * lista, o item é tratado como visível o episódio inteiro (cenas
   * estáticas, câmera fixa).
   */
  visivel?: [number, number][]
}

/**
 * Produtos ancorados em elementos da cena. O marcador (V do logo) é
 * posicionado em `spot`; a miniatura do produto é o próprio recorte
 * ampliado do quadro naquela coordenada — o item mostrado é literalmente
 * o item visto na cena.
 *
 * IMPORTANTE: cada `spot` foi conferido manualmente contra o frame real
 * do vídeo (poster do Pexels usado em `episodios.ts`) antes de entrar
 * aqui — só episódios com objetos de fato identificáveis na imagem (uma
 * peça de roupa, uma cortina) têm produtos. Os vídeos são footage de
 * stock, sem relação com o roteiro, então a maioria dos episódios não
 * tem nada "vendável" visível e fica de fora até termos vídeo próprio
 * (produzido) ou um novo poster que sustente um produto real. Antes de
 * adicionar um novo episódio aqui, baixe o `thumb` do episódio e
 * confirme visualmente que o objeto está mesmo naquela coordenada —
 * não estime a posição de memória.
 */
export const produtosPorEpisodio: Record<string, Produto[]> = {
  // ── Casamento Falso — ep 1: casal enrolado numa camisa azul, cortina
  // ao fundo (vídeo Pexels 9497521). Único item de vestuário visível é a
  // própria camisa; sem aliança, vaso ou calça no quadro. É um plano
  // dinâmico (câmera na mão) — conferido a cada 0.25s (ffmpeg) qual
  // objeto está de fato na coordenada do marcador em cada trecho:
  // 0–40s a camisa cobre o ponto com estabilidade; a cortina aparece em
  // dois trechos estáveis, ~5–10s e 20–38s; depois dos 40s a câmera
  // fecha em rosto/cabelo e nenhum dos dois é visível ali.
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

/** Sem `visivel`, o item vale para o episódio inteiro (cena estática). */
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

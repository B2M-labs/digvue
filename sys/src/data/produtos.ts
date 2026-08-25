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
  // própria camisa; sem aliança, vaso ou calça no quadro.
  '1-1': [
    {
      id: 'p-cf1-camisa-oxford',
      titulo: { pt: 'Camisa Oxford azul claro', en: 'Light Blue Oxford Shirt' },
      marca: 'Atelier Norte',
      preco: { pt: 189.9, en: 49.9 },
      spot: { x: 40, y: 78 },
    },
    {
      id: 'p-cf1-cortina',
      titulo: { pt: 'Cortina voil off-white', en: 'Off-White Sheer Curtain' },
      marca: 'Casa Vivo',
      preco: { pt: 319.9, en: 84.9 },
      spot: { x: 12, y: 20 },
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

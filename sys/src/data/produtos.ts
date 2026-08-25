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
 */
export const produtosPorEpisodio: Record<string, Produto[]> = {
  // ── Casamento Falso ────────────────────────────────────────────────────
  '1-1': [
    {
      id: 'p-cf1-camisa-oxford',
      titulo: { pt: 'Camisa Oxford azul claro', en: 'Light Blue Oxford Shirt' },
      marca: 'Atelier Norte',
      preco: { pt: 189.9, en: 49.9 },
      spot: { x: 37, y: 41 },
    },
    {
      id: 'p-cf1-camisa-branca',
      titulo: { pt: 'Camisa branca oversized', en: 'Oversized White Shirt' },
      marca: 'Linha Clara',
      preco: { pt: 149.9, en: 39.9 },
      spot: { x: 63, y: 37 },
    },
    {
      id: 'p-cf1-jeans',
      titulo: { pt: 'Calça jeans wide leg', en: 'Wide Leg Jeans' },
      marca: 'Denim Co.',
      preco: { pt: 229.9, en: 59.9 },
      spot: { x: 58, y: 63 },
    },
    {
      id: 'p-cf1-cortina',
      titulo: { pt: 'Cortina voil off-white', en: 'Off-White Sheer Curtain' },
      marca: 'Casa Vivo',
      preco: { pt: 319.9, en: 84.9 },
      spot: { x: 15, y: 29 },
    },
    {
      id: 'p-cf1-alianca',
      titulo: { pt: 'Aliança ouro 18k', en: '18k Gold Wedding Band' },
      marca: 'Ourivesaria Lume',
      preco: { pt: 1890, en: 490 },
      spot: { x: 47, y: 53 },
      zoom: 420,
    },
    {
      id: 'p-cf1-vaso',
      titulo: { pt: 'Vaso cerâmica fosco', en: 'Matte Ceramic Vase' },
      marca: 'Casa Vivo',
      preco: { pt: 129.9, en: 34.9 },
      spot: { x: 85, y: 71 },
    },
  ],
  '1-2': [
    {
      id: 'p-cf2-vestido',
      titulo: { pt: 'Vestido slip de seda', en: 'Silk Slip Dress' },
      marca: 'Maison Ivo',
      preco: { pt: 389.9, en: 99.9 },
      spot: { x: 52, y: 45 },
    },
    {
      id: 'p-cf2-sandalia',
      titulo: { pt: 'Sandália salto fino', en: 'Stiletto Sandal' },
      marca: 'Passo Nove',
      preco: { pt: 279.9, en: 74.9 },
      spot: { x: 44, y: 85 },
    },
    {
      id: 'p-cf2-brinco',
      titulo: { pt: 'Brinco argola dourado', en: 'Gold Hoop Earring' },
      marca: 'Ourivesaria Lume',
      preco: { pt: 99.9, en: 26.9 },
      spot: { x: 58, y: 25 },
      zoom: 420,
    },
    {
      id: 'p-cf2-taca',
      titulo: { pt: 'Taças de cristal (par)', en: 'Crystal Glasses (pair)' },
      marca: 'Mesa Rara',
      preco: { pt: 159.9, en: 42.9 },
      spot: { x: 23, y: 64 },
    },
    {
      id: 'p-cf2-luminaria',
      titulo: { pt: 'Luminária de mesa latão', en: 'Brass Table Lamp' },
      marca: 'Casa Vivo',
      preco: { pt: 249.9, en: 66.9 },
      spot: { x: 83, y: 33 },
    },
  ],
  '1-3': [
    {
      id: 'p-cf3-blazer',
      titulo: { pt: 'Blazer de alfaiataria bege', en: 'Beige Tailored Blazer' },
      marca: 'Atelier Norte',
      preco: { pt: 459.9, en: 119.9 },
      spot: { x: 40, y: 43 },
    },
    {
      id: 'p-cf3-relogio',
      titulo: { pt: 'Relógio aço minimalista', en: 'Minimal Steel Watch' },
      marca: 'Hora Prima',
      preco: { pt: 690, en: 179 },
      spot: { x: 62, y: 58 },
      zoom: 420,
    },
    {
      id: 'p-cf3-bolsa',
      titulo: { pt: 'Bolsa tote de couro', en: 'Leather Tote Bag' },
      marca: 'Couro & Co.',
      preco: { pt: 549.9, en: 139.9 },
      spot: { x: 29, y: 70 },
    },
    {
      id: 'p-cf3-oculos',
      titulo: { pt: 'Óculos de sol acetato', en: 'Acetate Sunglasses' },
      marca: 'Vista Sul',
      preco: { pt: 219.9, en: 59.9 },
      spot: { x: 56, y: 23 },
      zoom: 420,
    },
  ],

  // ── Vingança Doce ──────────────────────────────────────────────────────
  '2-1': [
    {
      id: 'p-vd1-trench',
      titulo: { pt: 'Trench coat gabardine', en: 'Gabardine Trench Coat' },
      marca: 'Atelier Norte',
      preco: { pt: 599.9, en: 159.9 },
      spot: { x: 48, y: 43 },
    },
    {
      id: 'p-vd1-bota',
      titulo: { pt: 'Bota de couro cano alto', en: 'Tall Leather Boot' },
      marca: 'Passo Nove',
      preco: { pt: 449.9, en: 119.9 },
      spot: { x: 42, y: 86 },
    },
    {
      id: 'p-vd1-case',
      titulo: { pt: 'Case aramida para celular', en: 'Aramid Phone Case' },
      marca: 'Nível Um',
      preco: { pt: 179.9, en: 44.9 },
      spot: { x: 67, y: 56 },
      zoom: 420,
    },
    {
      id: 'p-vd1-perfume',
      titulo: { pt: 'Perfume Amber 100ml', en: 'Amber Eau de Parfum 100ml' },
      marca: 'Casa Olfato',
      preco: { pt: 389.9, en: 104.9 },
      spot: { x: 75, y: 29 },
    },
  ],

  // ── Filha Perdida ──────────────────────────────────────────────────────
  '4-1': [
    {
      id: 'p-fp1-moletom',
      titulo: { pt: 'Moletom cinza unissex', en: 'Grey Unisex Sweatshirt' },
      marca: 'Linha Clara',
      preco: { pt: 159.9, en: 42.9 },
      spot: { x: 46, y: 41 },
    },
    {
      id: 'p-fp1-portaretrato',
      titulo: { pt: 'Porta-retrato de madeira', en: 'Wooden Picture Frame' },
      marca: 'Casa Vivo',
      preco: { pt: 89.9, en: 23.9 },
      spot: { x: 79, y: 31 },
    },
    {
      id: 'p-fp1-manta',
      titulo: { pt: 'Manta tricô de algodão', en: 'Cotton Knit Throw' },
      marca: 'Casa Vivo',
      preco: { pt: 199.9, en: 52.9 },
      spot: { x: 25, y: 68 },
    },
    {
      id: 'p-fp1-caneca',
      titulo: { pt: 'Caneca cerâmica artesanal', en: 'Handmade Ceramic Mug' },
      marca: 'Mesa Rara',
      preco: { pt: 69.9, en: 18.9 },
      spot: { x: 63, y: 73 },
      zoom: 420,
    },
  ],

  // ── Para Sempre ────────────────────────────────────────────────────────
  '5-1': [
    {
      id: 'p-ps1-camiseta',
      titulo: { pt: 'Camiseta de linho off-white', en: 'Off-White Linen Tee' },
      marca: 'Linha Clara',
      preco: { pt: 129.9, en: 34.9 },
      spot: { x: 44, y: 39 },
    },
    {
      id: 'p-ps1-colar',
      titulo: { pt: 'Colar ponto de luz', en: 'Solitaire Necklace' },
      marca: 'Ourivesaria Lume',
      preco: { pt: 349.9, en: 92.9 },
      spot: { x: 54, y: 29 },
      zoom: 420,
    },
    {
      id: 'p-ps1-tenis',
      titulo: { pt: 'Tênis de couro branco', en: 'White Leather Sneaker' },
      marca: 'Passo Nove',
      preco: { pt: 429.9, en: 114.9 },
      spot: { x: 48, y: 88 },
    },
    {
      id: 'p-ps1-toalha',
      titulo: { pt: 'Toalha de praia listrada', en: 'Striped Beach Towel' },
      marca: 'Casa Vivo',
      preco: { pt: 119.9, en: 31.9 },
      spot: { x: 21, y: 66 },
    },
  ],

  // ── Príncipe Real ──────────────────────────────────────────────────────
  '7-1': [
    {
      id: 'p-pr1-smoking',
      titulo: { pt: 'Smoking slim preto', en: 'Black Slim Tuxedo' },
      marca: 'Atelier Norte',
      preco: { pt: 1290, en: 339 },
      spot: { x: 46, y: 45 },
    },
    {
      id: 'p-pr1-gravata',
      titulo: { pt: 'Gravata borboleta de seda', en: 'Silk Bow Tie' },
      marca: 'Atelier Norte',
      preco: { pt: 149.9, en: 39.9 },
      spot: { x: 50, y: 27 },
      zoom: 420,
    },
    {
      id: 'p-pr1-abotoadura',
      titulo: { pt: 'Abotoadura de prata', en: 'Silver Cufflinks' },
      marca: 'Ourivesaria Lume',
      preco: { pt: 259.9, en: 68.9 },
      spot: { x: 34, y: 55 },
      zoom: 420,
    },
    {
      id: 'p-pr1-sapato',
      titulo: { pt: 'Sapato social verniz', en: 'Patent Leather Oxford' },
      marca: 'Passo Nove',
      preco: { pt: 539.9, en: 142.9 },
      spot: { x: 52, y: 90 },
    },
  ],

  // ── Amor Secreto do CEO ────────────────────────────────────────────────
  '8-1': [
    {
      id: 'p-ac1-blusa',
      titulo: { pt: 'Blusa de seda marfim', en: 'Ivory Silk Blouse' },
      marca: 'Maison Ivo',
      preco: { pt: 329.9, en: 87.9 },
      spot: { x: 50, y: 39 },
    },
    {
      id: 'p-ac1-saia',
      titulo: { pt: 'Saia lápis preta', en: 'Black Pencil Skirt' },
      marca: 'Maison Ivo',
      preco: { pt: 249.9, en: 66.9 },
      spot: { x: 48, y: 64 },
    },
    {
      id: 'p-ac1-sleeve',
      titulo: { pt: 'Capa de notebook em feltro', en: 'Felt Laptop Sleeve' },
      marca: 'Nível Um',
      preco: { pt: 139.9, en: 36.9 },
      spot: { x: 75, y: 58 },
    },
    {
      id: 'p-ac1-caderno',
      titulo: { pt: 'Caderno capa dura A5', en: 'A5 Hardcover Notebook' },
      marca: 'Papel Fino',
      preco: { pt: 79.9, en: 21.9 },
      spot: { x: 27, y: 70 },
      zoom: 420,
    },
    {
      id: 'p-ac1-cadeira',
      titulo: { pt: 'Cadeira ergonômica mesh', en: 'Ergonomic Mesh Chair' },
      marca: 'Nível Um',
      preco: { pt: 1590, en: 419 },
      spot: { x: 19, y: 49 },
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

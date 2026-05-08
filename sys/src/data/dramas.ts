export type Drama = {
  id: string
  titulo: string
  categoria: string
  rating: number
  episodios: number
  cor: 'cor1' | 'cor2' | 'cor3' | 'cor4' | 'cor5'
  badge?: 'NOVO' | 'VIP' | 'EM ALTA'
  descricao: string
  ano: number
  thumb: string
  banner: string
}

export const dramas: Drama[] = [
  {
    id: '1',
    titulo: 'Casamento Falso',
    categoria: 'Romance',
    rating: 4.8,
    episodios: 32,
    cor: 'cor1',
    badge: 'NOVO',
    descricao: 'Ela aceitou casar com o bilionário por 1 milhão de reais. Era apenas um contrato, sem amor, sem carinho. Mas quando o coração começa a falar mais alto que o dinheiro...',
    ano: 2026,
    thumb: '/assets/thumbnails/romance_1.jpg',
    banner: '/assets/thumbnails/romance_2.jpg',
  },
  {
    id: '2',
    titulo: 'Vingança Doce',
    categoria: 'Suspense',
    rating: 4.6,
    episodios: 28,
    cor: 'cor2',
    descricao: 'Depois de perder tudo, ela retorna mais forte e determinada a recuperar o que é seu.',
    ano: 2026,
    thumb: '/assets/thumbnails/suspense_1.jpg',
    banner: '/assets/thumbnails/suspense_2.jpg',
  },
  {
    id: '3',
    titulo: 'Lobo Alfa',
    categoria: 'Drama',
    rating: 4.9,
    episodios: 50,
    cor: 'cor3',
    badge: 'EM ALTA',
    descricao: 'Num mundo de humanos e lobos, dois destinos opostos se entrelaçam de forma inevitável.',
    ano: 2026,
    thumb: '/assets/thumbnails/drama_1.jpg',
    banner: '/assets/thumbnails/drama_2.jpg',
  },
  {
    id: '4',
    titulo: 'Filha Perdida',
    categoria: 'Família',
    rating: 4.7,
    episodios: 40,
    cor: 'cor4',
    descricao: 'Vinte anos depois, uma jovem descobre que foi adotada e parte em busca de sua verdadeira família.',
    ano: 2025,
    thumb: '/assets/thumbnails/familia_1.jpg',
    banner: '/assets/thumbnails/familia_2.jpg',
  },
  {
    id: '5',
    titulo: 'Para Sempre',
    categoria: 'Romance',
    rating: 4.5,
    episodios: 25,
    cor: 'cor5',
    descricao: 'Um amor que sobreviveu ao tempo e à distância, mas será que sobreviverá à verdade?',
    ano: 2026,
    thumb: '/assets/thumbnails/romance_3.jpg',
    banner: '/assets/thumbnails/romance_1.jpg',
  },
  {
    id: '6',
    titulo: 'Coração de Gelo',
    categoria: 'Drama',
    rating: 4.8,
    episodios: 38,
    cor: 'cor1',
    badge: 'VIP',
    descricao: 'O CEO mais frio da cidade jamais havia sentido nada. Até ela aparecer.',
    ano: 2026,
    thumb: '/assets/thumbnails/drama_3.jpg',
    banner: '/assets/thumbnails/drama_1.jpg',
  },
  {
    id: '7',
    titulo: 'Príncipe Real',
    categoria: 'Romance',
    rating: 4.9,
    episodios: 45,
    cor: 'cor2',
    badge: 'VIP',
    descricao: 'Uma garota comum se apaixona por um príncipe que o mundo inteiro quer.',
    ano: 2026,
    thumb: '/assets/thumbnails/romance_2.jpg',
    banner: '/assets/thumbnails/romance_3.jpg',
  },
  {
    id: '8',
    titulo: 'Amor Secreto do CEO',
    categoria: 'Romance',
    rating: 4.9,
    episodios: 42,
    cor: 'cor3',
    badge: 'EM ALTA',
    descricao: 'Ela foi contratada para ser secretária. Ele prometeu nunca se apaixonar. Promessas custam caro.',
    ano: 2026,
    thumb: '/assets/thumbnails/suspense_3.jpg',
    banner: '/assets/thumbnails/suspense_1.jpg',
  },
  {
    id: '9',
    titulo: 'O Segredo da Herdeira',
    categoria: 'Suspense',
    rating: 4.7,
    episodios: 36,
    cor: 'cor4',
    descricao: 'A jovem herdeira da maior fortuna do país guarda um segredo que pode destruir sua família — e o homem que ela ama.',
    ano: 2026,
    thumb: '/assets/thumbnails/suspense_2.jpg',
    banner: '/assets/thumbnails/suspense_3.jpg',
  },
  {
    id: '10',
    titulo: 'A Última Chance',
    categoria: 'Família',
    rating: 4.8,
    episodios: 24,
    cor: 'cor5',
    descricao: 'Um pai ausente, uma filha que cresceu sem ele e um diagnóstico que dá a ambos apenas 30 dias para se conhecerem.',
    ano: 2026,
    thumb: '/assets/thumbnails/familia_3.jpg',
    banner: '/assets/thumbnails/familia_1.jpg',
  },
]

export const categorias = ['Tudo', 'Romance', 'Drama', 'Comédia', 'Suspense', 'Família']

export const tendencias = dramas.slice(0, 6).map((d, i) => ({ ...d, posicao: i + 1 }))

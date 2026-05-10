export type Drama = {
  id: string
  titulo: { pt: string; en: string }
  categoria: string
  rating: number
  episodios: number
  cor: 'cor1' | 'cor2' | 'cor3' | 'cor4' | 'cor5'
  badge?: 'NOVO' | 'VIP' | 'EM ALTA'
  descricao: { pt: string; en: string }
  ano: number
  thumb: string
  banner: string
}

export const dramas: Drama[] = [
  {
    id: '1',
    titulo: { pt: 'Casamento Falso', en: 'Fake Marriage' },
    categoria: 'Romance',
    rating: 4.8,
    episodios: 32,
    cor: 'cor1',
    badge: 'NOVO',
    descricao: {
      pt: 'Ela aceitou casar com o bilionário por 1 milhão de reais. Era apenas um contrato, sem amor, sem carinho. Mas quando o coração começa a falar mais alto que o dinheiro...',
      en: 'She agreed to marry the billionaire for 1 million dollars. It was just a contract — no love, no affection. But when the heart starts speaking louder than money...',
    },
    ano: 2026,
    thumb: '/assets/thumbnails/romance_1.jpg',
    banner: '/assets/thumbnails/romance_2.jpg',
  },
  {
    id: '2',
    titulo: { pt: 'Vingança Doce', en: 'Sweet Revenge' },
    categoria: 'Suspense',
    rating: 4.6,
    episodios: 28,
    cor: 'cor2',
    descricao: {
      pt: 'Depois de perder tudo, ela retorna mais forte e determinada a recuperar o que é seu.',
      en: 'After losing everything, she returns stronger and more determined than ever to reclaim what is hers.',
    },
    ano: 2026,
    thumb: '/assets/thumbnails/suspense_1.jpg',
    banner: '/assets/thumbnails/suspense_2.jpg',
  },
  {
    id: '3',
    titulo: { pt: 'Lobo Alfa', en: 'Alpha Wolf' },
    categoria: 'Drama',
    rating: 4.9,
    episodios: 50,
    cor: 'cor3',
    badge: 'EM ALTA',
    descricao: {
      pt: 'Num mundo de humanos e lobos, dois destinos opostos se entrelaçam de forma inevitável.',
      en: 'In a world of humans and wolves, two opposing destinies intertwine in the most inevitable way.',
    },
    ano: 2026,
    thumb: '/assets/thumbnails/drama_1.jpg',
    banner: '/assets/thumbnails/drama_2.jpg',
  },
  {
    id: '4',
    titulo: { pt: 'Filha Perdida', en: 'Lost Daughter' },
    categoria: 'Família',
    rating: 4.7,
    episodios: 40,
    cor: 'cor4',
    descricao: {
      pt: 'Vinte anos depois, uma jovem descobre que foi adotada e parte em busca de sua verdadeira família.',
      en: 'Twenty years later, a young woman discovers she was adopted and sets out to find her true family.',
    },
    ano: 2025,
    thumb: '/assets/thumbnails/familia_1.jpg',
    banner: '/assets/thumbnails/familia_2.jpg',
  },
  {
    id: '5',
    titulo: { pt: 'Para Sempre', en: 'Forever' },
    categoria: 'Romance',
    rating: 4.5,
    episodios: 25,
    cor: 'cor5',
    descricao: {
      pt: 'Um amor que sobreviveu ao tempo e à distância, mas será que sobreviverá à verdade?',
      en: 'A love that survived time and distance — but will it survive the truth?',
    },
    ano: 2026,
    thumb: '/assets/thumbnails/romance_3.jpg',
    banner: '/assets/thumbnails/romance_1.jpg',
  },
  {
    id: '6',
    titulo: { pt: 'Coração de Gelo', en: 'Heart of Ice' },
    categoria: 'Drama',
    rating: 4.8,
    episodios: 38,
    cor: 'cor1',
    badge: 'VIP',
    descricao: {
      pt: 'O CEO mais frio da cidade jamais havia sentido nada. Até ela aparecer.',
      en: "The coldest CEO in the city had never felt a thing. Until she walked into his life.",
    },
    ano: 2026,
    thumb: '/assets/thumbnails/drama_3.jpg',
    banner: '/assets/thumbnails/drama_1.jpg',
  },
  {
    id: '7',
    titulo: { pt: 'Príncipe Real', en: 'The Real Prince' },
    categoria: 'Romance',
    rating: 4.9,
    episodios: 45,
    cor: 'cor2',
    badge: 'VIP',
    descricao: {
      pt: 'Uma garota comum se apaixona por um príncipe que o mundo inteiro quer.',
      en: 'An ordinary girl falls in love with the prince the whole world is after.',
    },
    ano: 2026,
    thumb: '/assets/thumbnails/romance_2.jpg',
    banner: '/assets/thumbnails/romance_3.jpg',
  },
  {
    id: '8',
    titulo: { pt: 'Amor Secreto do CEO', en: "The CEO's Secret Love" },
    categoria: 'Romance',
    rating: 4.9,
    episodios: 42,
    cor: 'cor3',
    badge: 'EM ALTA',
    descricao: {
      pt: 'Ela foi contratada para ser secretária. Ele prometeu nunca se apaixonar. Promessas custam caro.',
      en: 'She was hired to be his secretary. He promised never to fall in love. Promises come at a price.',
    },
    ano: 2026,
    thumb: '/assets/thumbnails/suspense_3.jpg',
    banner: '/assets/thumbnails/suspense_1.jpg',
  },
  {
    id: '9',
    titulo: { pt: 'O Segredo da Herdeira', en: "The Heiress's Secret" },
    categoria: 'Suspense',
    rating: 4.7,
    episodios: 36,
    cor: 'cor4',
    descricao: {
      pt: 'A jovem herdeira da maior fortuna do país guarda um segredo que pode destruir sua família — e o homem que ela ama.',
      en: "The young heiress of the country's greatest fortune hides a secret that could destroy her family — and the man she loves.",
    },
    ano: 2026,
    thumb: '/assets/thumbnails/suspense_2.jpg',
    banner: '/assets/thumbnails/suspense_3.jpg',
  },
  {
    id: '10',
    titulo: { pt: 'A Última Chance', en: 'The Last Chance' },
    categoria: 'Família',
    rating: 4.8,
    episodios: 24,
    cor: 'cor5',
    descricao: {
      pt: 'Um pai ausente, uma filha que cresceu sem ele e um diagnóstico que dá a ambos apenas 30 dias para se conhecerem.',
      en: 'An absent father, a daughter who grew up without him, and a diagnosis that gives them both just 30 days to truly know each other.',
    },
    ano: 2026,
    thumb: '/assets/thumbnails/familia_3.jpg',
    banner: '/assets/thumbnails/familia_1.jpg',
  },
]

export const categorias = ['Tudo', 'Romance', 'Drama', 'Comédia', 'Suspense', 'Família']

export const tendencias = dramas.slice(0, 6).map((d, i) => ({ ...d, posicao: i + 1 }))

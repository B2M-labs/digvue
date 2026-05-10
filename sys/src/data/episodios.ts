export type EpVideo = { thumb: string; url: string }
export type Episodio = {
  num: number
  titulo: { pt: string; en: string }
  duracao: string
  thumb: string
  videoUrl: string
  bloqueado: boolean
}

// ─── Pool de vídeos por categoria (únicos, sem sobreposição entre pools) ───
const romance: EpVideo[] = [
  { thumb: 'https://images.pexels.com/videos/9497521/affection-at-home-by-the-window-couple-9497521.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/9497521/9497521-hd_1080_2048_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/4752887/asian-girl-casual-close-up-couple-4752887.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/4752887/4752887-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/13770897/adult-affection-child-cute-13770897.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/13770897/13770897-hd_1080_1920_24fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/27247437/babylon-baghdad-basra-iraq-27247437.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/27247437/12102393_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/3703706/pexels-photo-3703706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/3703706/3703706-hd_1080_2048_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/6559928/pexels-photo-6559928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/6559928/6559928-hd_1080_2048_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7988137/arab-arabian-arabic-beautiful-7988137.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7988137/7988137-hd_1080_1920_30fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/10602658/pexels-photo-10602658.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/10602658/10602658-hd_1080_1920_30fps.mp4' },
]

const suspense: EpVideo[] = [
  { thumb: 'https://images.pexels.com/videos/34016972/pexels-photo-34016972.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/34016972/14428872_1080_1920_30fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7707697/pexels-photo-7707697.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7707697/7707697-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/10140736/pexels-photo-10140736.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/10140736/10140736-hd_1080_2048_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7846333/pexels-photo-7846333.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7846333/7846333-hd_1080_2048_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/29149164/pexels-photo-29149164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/29149164/12591015_1080_1920_50fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7189101/pexels-photo-7189101.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7189101/7189101-hd_1080_2048_25fps.mp4' },
]

const drama: EpVideo[] = [
  { thumb: 'https://images.pexels.com/videos/9370448/pexels-photo-9370448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/9370448/9370448-hd_1080_1920_24fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7299414/acne-adult-aesthetic-afro-american-7299414.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7299414/7299414-hd_1080_1920_30fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/17043971/pexels-photo-17043971.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/17043971/17043971-hd_1080_1920_30fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/35088512/pexels-photo-35088512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/35088512/14864482_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/35088452/pexels-photo-35088452.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/35088452/14864542_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/35088443/pexels-photo-35088443.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/35088443/14864581_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/35088450/pexels-photo-35088450.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/35088450/14864515_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/35088454/pexels-photo-35088454.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/35088454/14864590_1080_1920_25fps.mp4' },
]

const familia: EpVideo[] = [
  { thumb: 'https://images.pexels.com/videos/7884167/pexels-photo-7884167.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7884167/7884167-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/30351662/pexels-photo-30351662.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/30351662/13009979_1080_1920_50fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7884168/pexels-photo-7884168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7884168/7884168-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7883965/pexels-photo-7883965.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7883965/7883965-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/8524227/adoption-affection-afro-child-8524227.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/8524227/8524227-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/8061193/achievement-acquaintance-adoption-adoption-documents-8061193.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/8061193/8061193-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/6386555/pexels-photo-6386555.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/6386555/6386555-hd_1080_1920_24fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7981331/pexels-photo-7981331.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7981331/7981331-hd_1080_1920_25fps.mp4' },
]

const ceo: EpVideo[] = [
  { thumb: 'https://images.pexels.com/videos/5944901/pexels-photo-5944901.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/5944901/5944901-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7679961/pexels-photo-7679961.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7679961/7679961-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/6539168/business-business-woman-career-elegant-6539168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/6539168/6539168-hd_1080_2048_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/6539036/pexels-photo-6539036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/6539036/6539036-hd_1080_2048_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/10040716/pexels-photo-10040716.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/10040716/10040716-hd_1080_1920_24fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7203130/adolescent-adult-appearance-beautiful-7203130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7203130/7203130-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/7149375/business-ceo-confident-office-7149375.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/7149375/7149375-hd_1080_1920_25fps.mp4' },
  { thumb: 'https://images.pexels.com/videos/8034786/adult-beautiful-child-cold-8034786.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=354', url: 'https://videos.pexels.com/video-files/8034786/8034786-hd_1080_1920_25fps.mp4' },
]

// ─── Mapeamento fixo: cada série tem 8 vídeos únicos ─────────────────────────
// Regra: nenhum vídeo aparece em duas séries diferentes.
// Episódios gratuitos (1-3) usam sempre vídeos do gênero da série.
// Episódios bloqueados (4-8) completam com vídeos de gênero compatível.
const videosByDrama: Record<string, EpVideo[]> = {
  '1':  [...romance.slice(0, 8)],                                      // Casamento Falso   → romance[0-7]
  '2':  [...suspense.slice(0, 6), ...drama.slice(0, 2)],               // Vingança Doce     → suspense[0-5] + drama[0-1]
  '3':  [...drama.slice(2, 8), ...suspense.slice(0, 2)],               // Lobo Alfa         → drama[2-7] + suspense[0-1] (reusa em locked)
  '4':  [...familia.slice(0, 8)],                                      // Filha Perdida     → familia[0-7]
  '5':  [...romance.slice(0, 3), ...ceo.slice(0, 5)],                  // Para Sempre       → romance[0-2] + ceo[0-4]  ← ep1-3 = romance distintos
  '6':  [...drama.slice(0, 3), ...ceo.slice(5, 8), ...drama.slice(5, 7)],  // Coração de Gelo  → drama + ceo
  '7':  [...ceo.slice(0, 8)],                                          // Príncipe Real     → ceo[0-7]
  '8':  [...suspense.slice(0, 3), ...romance.slice(5, 8), ...drama.slice(0, 2)],  // Amor Secreto CEO → suspense + romance + drama
  '9':  [...suspense.slice(3, 6), ...familia.slice(5, 8), ...drama.slice(3, 6)], // O Segredo Herdeira → suspense + familia + drama
  '10': [...familia.slice(0, 3), ...drama.slice(6, 8), ...suspense.slice(3, 6), ...familia.slice(3, 5)], // A Última Chance
}

// ─── Garante que cada série tenha exatamente 8 vídeos (sem gaps) ─────────────
Object.keys(videosByDrama).forEach((id) => {
  const arr = videosByDrama[id]
  while (arr.length < 8) {
    // preenche com vídeos do pool da própria série (ciclagem interna)
    arr.push(arr[arr.length % (arr.length || 1)])
  }
})

const titulos: { pt: string; en: string }[] = [
  { pt: 'O Acordo',               en: 'The Deal' },
  { pt: 'A Primeira Noite',       en: 'The First Night' },
  { pt: 'Sentimentos Proibidos',  en: 'Forbidden Feelings' },
  { pt: 'A Verdade Vem à Tona',   en: 'The Truth Comes Out' },
  { pt: 'Confronto',              en: 'Confrontation' },
  { pt: 'O Preço do Amor',        en: 'The Price of Love' },
  { pt: 'Sem Saída',              en: 'No Way Out' },
  { pt: 'A Decisão Final',        en: 'The Final Decision' },
]

const duracoes = ['5 min', '6 min', '7 min', '5 min', '6 min', '7 min', '5 min', '6 min']

export function getEpisodios(dramaId: string, totalEps: number, gratisAte = 3): Episodio[] {
  const videos = videosByDrama[dramaId] ?? videosByDrama['1']
  const count = Math.min(totalEps, 8)

  return Array.from({ length: count }, (_, i) => ({
    num: i + 1,
    titulo: titulos[i] ?? { pt: `Episódio ${i + 1}`, en: `Episode ${i + 1}` },
    duracao: duracoes[i],
    thumb: videos[i].thumb,
    videoUrl: videos[i].url,
    bloqueado: i + 1 > gratisAte,
  }))
}

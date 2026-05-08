export type Produto = {
  titulo: string
  img: string
  url: string
}

export const produtosPorEpisodio: Record<string, Produto[]> = {
  '1-1': [
    {
      titulo: 'Camisa social masculina azul claro oxford',
      img: 'https://m.media-amazon.com/images/I/41RHrulSl8L._AC_SX300_.jpg',
      url: 'https://www.amazon.com.br/Lusead-masculina-neg%C3%B3cios-algod%C3%A3o-modelagem/dp/B0FLX9C5F1/',
    },
    {
      titulo: 'Camisa branca oversized feminina manga longa',
      img: 'https://m.media-amazon.com/images/I/3114WMCa%2bnL._AC_SX300_.jpg',
      url: 'https://www.amazon.com.br/Camisa-Oversized-Feminina-Algod%C3%A3o-Regular/dp/B0FWG4QPP3/',
    },
    {
      titulo: 'Top / blusa rosa',
      img: 'https://images-na.ssl-images-amazon.com/images/P/B08DNZVKKC.01.AC._SX300_.jpg',
      url: 'https://www.amazon.com.br/Suti%C3%A3-Regata-She-Feminino-Rosa/dp/B08DNZVKKC/',
    },
    {
      titulo: 'Calça jeans feminina azul claro',
      img: 'https://m.media-amazon.com/images/I/31bG5xpEOQL._AC_SX300_.jpg',
      url: 'https://www.amazon.com.br/Tommy-Hilfiger-Cal%C3%A7a-feminina-cintura/dp/B0GHR96PG1/',
    },
    {
      titulo: 'Cortina voil bege com forro',
      img: 'https://m.media-amazon.com/images/I/41c5sniY1NL._AC_SX300_.jpg',
      url: 'https://www.amazon.com.br/Cortina-Voil-com-Forro-Microfibra/dp/B08T22D75L/',
    },
  ],
}

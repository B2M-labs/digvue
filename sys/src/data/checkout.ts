import type { Lang } from './i18n'

/* ────────────────────────────────────────────────────────────────────────────
   MOEDA E CASHBACK
   1 episódio = 50 moedas. Pacote base = 100 moedas por R$ 9,90 / US$ 1,99,
   logo cada moeda vale ~R$ 0,099 / ~US$ 0,0199.
   Cashback = 1% do valor da compra, convertido em moedas por esse valor.
   ──────────────────────────────────────────────────────────────────────────── */

export const CASHBACK_RATE = 0.01
export const VALOR_MOEDA: Record<Lang, number> = { pt: 0.099, en: 0.0199 }
export const CUSTO_EPISODIO = 50

export function formatMoeda(valor: number, lang: Lang): string {
  return lang === 'pt'
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valor)
}

/** Moedas devolvidas por uma compra: 1% do valor, convertido pelo valor da moeda. */
export function moedasDeCashback(total: number, lang: Lang): number {
  return Math.floor((total * CASHBACK_RATE) / VALOR_MOEDA[lang])
}

/** Quantos episódios essas moedas liberam (com o resto). */
export function episodiosDeMoedas(moedas: number) {
  return { inteiros: Math.floor(moedas / CUSTO_EPISODIO), resto: moedas % CUSTO_EPISODIO }
}

/* ────────────────────────────────────────────────────────────────────────────
   MÁSCARAS
   ──────────────────────────────────────────────────────────────────────────── */

const digitos = (v: string) => v.replace(/\D/g, '')

export function maskCep(v: string): string {
  const d = digitos(v).slice(0, 8)
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d
}

export function maskZip(v: string): string {
  return digitos(v).slice(0, 5)
}

export function maskCodigoPostal(v: string, lang: Lang): string {
  return lang === 'pt' ? maskCep(v) : maskZip(v)
}

export function maskCpf(v: string): string {
  const d = digitos(v).slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`
}

export function maskTelefone(v: string, lang: Lang): string {
  const d = digitos(v).slice(0, lang === 'pt' ? 11 : 10)
  if (lang === 'pt') {
    if (d.length <= 2) return d
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  }
  if (d.length <= 3) return d
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function maskCartao(v: string): string {
  const d = digitos(v).slice(0, 19)
  if (bandeiraDe(d) === 'amex') {
    return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(' ')
  }
  return (d.match(/.{1,4}/g) ?? []).join(' ')
}

export function maskValidade(v: string): string {
  const d = digitos(v).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

/* ────────────────────────────────────────────────────────────────────────────
   VALIDAÇÕES
   ──────────────────────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

export function validarEmail(email: string): boolean {
  const v = email.trim()
  return v.length <= 254 && EMAIL_RE.test(v)
}

/** CPF com dígitos verificadores (mod 11). */
export function validarCpf(cpf: string): boolean {
  const d = digitos(cpf)
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false
  for (const bloco of [9, 10]) {
    let soma = 0
    for (let i = 0; i < bloco; i++) soma += Number(d[i]) * (bloco + 1 - i)
    const resto = (soma * 10) % 11
    const dv = resto === 10 ? 0 : resto
    if (dv !== Number(d[bloco])) return false
  }
  return true
}

export function validarTelefone(tel: string, lang: Lang): boolean {
  const d = digitos(tel)
  return lang === 'pt' ? d.length === 10 || d.length === 11 : d.length === 10
}

export type Bandeira = 'visa' | 'mastercard' | 'amex' | 'elo' | 'desconhecida'

export function bandeiraDe(numero: string): Bandeira {
  const d = digitos(numero)
  if (/^4/.test(d)) return 'visa'
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(d)) return 'mastercard'
  if (/^3[47]/.test(d)) return 'amex'
  if (/^(4011|4389|5041|5067|509|6277|6362|650|6516|6550)/.test(d)) return 'elo'
  return 'desconhecida'
}

export const NOME_BANDEIRA: Record<Bandeira, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  elo: 'Elo',
  desconhecida: '',
}

export function tamanhoCvv(numero: string): number {
  return bandeiraDe(numero) === 'amex' ? 4 : 3
}

/** Luhn (mod 10). */
export function validarCartao(numero: string): boolean {
  const d = digitos(numero)
  if (d.length < 13 || d.length > 19) return false
  let soma = 0
  let dobra = false
  for (let i = d.length - 1; i >= 0; i--) {
    let n = Number(d[i])
    if (dobra) {
      n *= 2
      if (n > 9) n -= 9
    }
    soma += n
    dobra = !dobra
  }
  return soma % 10 === 0
}

/** MM/AA no futuro (aceita o mês corrente). */
export function validarValidade(valor: string, agora = new Date()): boolean {
  const d = digitos(valor)
  if (d.length !== 4) return false
  const mes = Number(d.slice(0, 2))
  const ano = 2000 + Number(d.slice(2))
  if (mes < 1 || mes > 12) return false
  const fim = new Date(ano, mes, 1) // primeiro instante após o mês de validade
  return fim > agora && ano <= agora.getFullYear() + 20
}

export function validarCvv(cvv: string, numero: string): boolean {
  return digitos(cvv).length === tamanhoCvv(numero)
}

/* ────────────────────────────────────────────────────────────────────────────
   ENDEREÇO — CEP (Brasil) e ZIP (EUA)
   Tenta a API pública real; se a rede falhar, resolve por faixa de prefixo,
   que é o mapeamento oficial de estados. Assim a validação nunca "morre"
   numa demo offline.
   ──────────────────────────────────────────────────────────────────────────── */

export type Endereco = {
  rua: string
  bairro: string
  cidade: string
  estado: string
}

export type ResultadoBusca =
  | { ok: true; endereco: Endereco; fonte: 'api' | 'local' }
  | { ok: false; motivo: 'formato' | 'nao_encontrado' }

/** Faixas oficiais de CEP por UF (primeiros 5 dígitos). */
const FAIXAS_CEP: [number, number, string][] = [
  [1000, 19999, 'SP'], [20000, 28999, 'RJ'], [29000, 29999, 'ES'],
  [30000, 39999, 'MG'], [40000, 48999, 'BA'], [49000, 49999, 'SE'],
  [50000, 56999, 'PE'], [57000, 57999, 'AL'], [58000, 58999, 'PB'],
  [59000, 59999, 'RN'], [60000, 63999, 'CE'], [64000, 64999, 'PI'],
  [65000, 65999, 'MA'], [66000, 68899, 'PA'], [68900, 68999, 'AP'],
  [69000, 69299, 'AM'], [69300, 69389, 'RR'], [69400, 69899, 'AM'],
  [69900, 69999, 'AC'], [70000, 72799, 'DF'], [72800, 72999, 'GO'],
  [73000, 73699, 'DF'], [73700, 76799, 'GO'], [76800, 76999, 'RO'],
  [77000, 77999, 'TO'], [78000, 78999, 'MT'], [79000, 79999, 'MS'],
  [80000, 87999, 'PR'], [88000, 89999, 'SC'], [90000, 99999, 'RS'],
]

/** Faixas de ZIP por estado (primeiros 3 dígitos). */
const FAIXAS_ZIP: [number, number, string][] = [
  [5, 5, 'NY'], [10, 27, 'MA'], [28, 29, 'RI'], [30, 38, 'NH'], [39, 49, 'ME'],
  [50, 59, 'VT'], [60, 69, 'CT'], [70, 89, 'NJ'], [100, 149, 'NY'],
  [150, 196, 'PA'], [197, 199, 'DE'], [200, 205, 'DC'], [206, 219, 'MD'],
  [220, 246, 'VA'], [247, 268, 'WV'], [270, 289, 'NC'], [290, 299, 'SC'],
  [300, 319, 'GA'], [320, 349, 'FL'], [350, 369, 'AL'], [370, 385, 'TN'],
  [386, 397, 'MS'], [398, 399, 'GA'], [400, 427, 'KY'], [430, 459, 'OH'],
  [460, 479, 'IN'], [480, 499, 'MI'], [500, 528, 'IA'], [530, 549, 'WI'],
  [550, 567, 'MN'], [570, 577, 'SD'], [580, 588, 'ND'], [590, 599, 'MT'],
  [600, 629, 'IL'], [630, 658, 'MO'], [660, 679, 'KS'], [680, 693, 'NE'],
  [700, 714, 'LA'], [716, 729, 'AR'], [730, 749, 'OK'], [750, 799, 'TX'],
  [800, 816, 'CO'], [820, 831, 'WY'], [832, 838, 'ID'], [840, 847, 'UT'],
  [850, 865, 'AZ'], [870, 884, 'NM'], [889, 898, 'NV'], [900, 961, 'CA'],
  [967, 968, 'HI'], [970, 979, 'OR'], [980, 994, 'WA'], [995, 999, 'AK'],
]

function porFaixa(n: number, faixas: [number, number, string][]): string | null {
  for (const [ini, fim, uf] of faixas) if (n >= ini && n <= fim) return uf
  return null
}

/** CEPs/ZIPs conhecidos — respostas ricas mesmo sem rede. */
const CONHECIDOS_BR: Record<string, Endereco> = {
  '01310100': { rua: 'Avenida Paulista', bairro: 'Bela Vista', cidade: 'São Paulo', estado: 'SP' },
  '04538133': { rua: 'Avenida Brigadeiro Faria Lima', bairro: 'Itaim Bibi', cidade: 'São Paulo', estado: 'SP' },
  '22071000': { rua: 'Avenida Atlântica', bairro: 'Copacabana', cidade: 'Rio de Janeiro', estado: 'RJ' },
  '20040002': { rua: 'Avenida Rio Branco', bairro: 'Centro', cidade: 'Rio de Janeiro', estado: 'RJ' },
  '30130010': { rua: 'Avenida Afonso Pena', bairro: 'Centro', cidade: 'Belo Horizonte', estado: 'MG' },
  '80010010': { rua: 'Rua XV de Novembro', bairro: 'Centro', cidade: 'Curitiba', estado: 'PR' },
  '90010150': { rua: 'Rua dos Andradas', bairro: 'Centro Histórico', cidade: 'Porto Alegre', estado: 'RS' },
  '40020000': { rua: 'Avenida Sete de Setembro', bairro: 'Centro', cidade: 'Salvador', estado: 'BA' },
  '50030230': { rua: 'Avenida Rio Branco', bairro: 'Recife', cidade: 'Recife', estado: 'PE' },
  '70070600': { rua: 'Esplanada dos Ministérios', bairro: 'Zona Cívico-Administrativa', cidade: 'Brasília', estado: 'DF' },
  '60060170': { rua: 'Avenida Beira Mar', bairro: 'Meireles', cidade: 'Fortaleza', estado: 'CE' },
  '88015600': { rua: 'Avenida Beira Mar Norte', bairro: 'Centro', cidade: 'Florianópolis', estado: 'SC' },
}

const CONHECIDOS_US: Record<string, Endereco> = {
  '10001': { rua: '', bairro: 'Chelsea', cidade: 'New York', estado: 'NY' },
  '10012': { rua: '', bairro: 'SoHo', cidade: 'New York', estado: 'NY' },
  '90210': { rua: '', bairro: '', cidade: 'Beverly Hills', estado: 'CA' },
  '94103': { rua: '', bairro: 'South of Market', cidade: 'San Francisco', estado: 'CA' },
  '90028': { rua: '', bairro: 'Hollywood', cidade: 'Los Angeles', estado: 'CA' },
  '60601': { rua: '', bairro: 'The Loop', cidade: 'Chicago', estado: 'IL' },
  '33139': { rua: '', bairro: 'South Beach', cidade: 'Miami Beach', estado: 'FL' },
  '78701': { rua: '', bairro: 'Downtown', cidade: 'Austin', estado: 'TX' },
  '02108': { rua: '', bairro: 'Beacon Hill', cidade: 'Boston', estado: 'MA' },
  '98101': { rua: '', bairro: 'Downtown', cidade: 'Seattle', estado: 'WA' },
  '30303': { rua: '', bairro: 'Downtown', cidade: 'Atlanta', estado: 'GA' },
  '20500': { rua: '1600 Pennsylvania Ave NW', bairro: '', cidade: 'Washington', estado: 'DC' },
}

async function fetchComTimeout(url: string, ms = 4000): Promise<Response | null> {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), ms)
    const res = await fetch(url, { signal: ctrl.signal })
    clearTimeout(timer)
    return res.ok ? res : null
  } catch {
    return null
  }
}

/** Formato válido de código postal para o idioma. */
export function formatoPostalValido(codigo: string, lang: Lang): boolean {
  const d = digitos(codigo)
  return lang === 'pt' ? d.length === 8 : d.length === 5
}

export async function buscarEndereco(codigo: string, lang: Lang): Promise<ResultadoBusca> {
  const d = digitos(codigo)
  if (!formatoPostalValido(d, lang)) return { ok: false, motivo: 'formato' }

  if (lang === 'pt') {
    const res = await fetchComTimeout(`https://viacep.com.br/ws/${d}/json/`)
    if (res) {
      const j = await res.json().catch(() => null)
      if (j && !j.erro && j.uf) {
        return {
          ok: true,
          fonte: 'api',
          endereco: {
            rua: j.logradouro ?? '',
            bairro: j.bairro ?? '',
            cidade: j.localidade ?? '',
            estado: j.uf,
          },
        }
      }
    }
    if (CONHECIDOS_BR[d]) return { ok: true, fonte: 'local', endereco: CONHECIDOS_BR[d] }
    const uf = porFaixa(Number(d.slice(0, 5)), FAIXAS_CEP)
    if (!uf) return { ok: false, motivo: 'nao_encontrado' }
    return { ok: true, fonte: 'local', endereco: { rua: '', bairro: '', cidade: '', estado: uf } }
  }

  const res = await fetchComTimeout(`https://api.zippopotam.us/us/${d}`)
  if (res) {
    const j = await res.json().catch(() => null)
    const lugar = j?.places?.[0]
    if (lugar) {
      return {
        ok: true,
        fonte: 'api',
        endereco: {
          rua: '',
          bairro: '',
          cidade: lugar['place name'] ?? '',
          estado: lugar['state abbreviation'] ?? '',
        },
      }
    }
  }
  if (CONHECIDOS_US[d]) return { ok: true, fonte: 'local', endereco: CONHECIDOS_US[d] }
  const st = porFaixa(Number(d.slice(0, 3)), FAIXAS_ZIP)
  if (!st) return { ok: false, motivo: 'nao_encontrado' }
  return { ok: true, fonte: 'local', endereco: { rua: '', bairro: '', cidade: '', estado: st } }
}

export const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

export const ESTADOS_US = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
  'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA',
  'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

export function estadosDe(lang: Lang): string[] {
  return lang === 'pt' ? ESTADOS_BR : ESTADOS_US
}

export function paisDe(lang: Lang): string {
  return lang === 'pt' ? 'Brasil' : 'United States'
}

/* ────────────────────────────────────────────────────────────────────────────
   FRETE E PARCELAMENTO
   ──────────────────────────────────────────────────────────────────────────── */

export type Frete = { id: 'padrao' | 'expresso'; preco: number; dias: [number, number] }

export function fretesDe(lang: Lang, subtotal: number): Frete[] {
  const limiteGratis = lang === 'pt' ? 299 : 79
  return [
    {
      id: 'padrao',
      preco: subtotal >= limiteGratis ? 0 : lang === 'pt' ? 24.9 : 6.95,
      dias: lang === 'pt' ? [4, 8] : [3, 6],
    },
    {
      id: 'expresso',
      preco: lang === 'pt' ? 49.9 : 14.95,
      dias: lang === 'pt' ? [1, 2] : [1, 2],
    },
  ]
}

/** Parcelamento sem juros (padrão do mercado brasileiro). */
export function parcelasDisponiveis(total: number): number[] {
  const minParcela = 20
  const max = Math.min(12, Math.max(1, Math.floor(total / minParcela)))
  return Array.from({ length: max }, (_, i) => i + 1)
}

/** Data prevista de entrega, formatada no idioma. */
export function previsaoEntrega(dias: [number, number], lang: Lang): string {
  const fmt = (d: number) => {
    const data = new Date()
    data.setDate(data.getDate() + d)
    return data.toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: 'short',
    })
  }
  return `${fmt(dias[0])} – ${fmt(dias[1])}`
}

/** Número de pedido determinístico e legível. */
export function gerarNumeroPedido(seed: number): string {
  const base = (seed % 1_000_000).toString().padStart(6, '0')
  return `DV-${base}`
}

/** Chave PIX copia-e-cola simulada (formato EMV plausível). */
export function pixCopiaECola(pedido: string, valor: number): string {
  const v = valor.toFixed(2)
  return `00020126580014BR.GOV.BCB.PIX0136digvue-${pedido.toLowerCase()}5204000053039865802BR5906DIGVUE6009SAO PAULO54${String(v.length).padStart(2, '0')}${v}6304`
}

/** Grade pseudo-QR determinística a partir de uma string. */
export function gradeQr(seed: string, tamanho = 21): boolean[][] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const grade: boolean[][] = []
  for (let y = 0; y < tamanho; y++) {
    const linha: boolean[] = []
    for (let x = 0; x < tamanho; x++) {
      h ^= h << 13
      h ^= h >>> 17
      h ^= h << 5
      linha.push((h >>> 0) % 100 < 47)
    }
    grade.push(linha)
  }
  // marcadores de posição nos três cantos, como num QR real
  const finder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const borda = x === 0 || y === 0 || x === 6 || y === 6
        const centro = x >= 2 && x <= 4 && y >= 2 && y <= 4
        grade[oy + y][ox + x] = borda || centro
      }
    }
    for (let y = -1; y < 8; y++) {
      for (let x = -1; x < 8; x++) {
        const gy = oy + y
        const gx = ox + x
        if (gy < 0 || gx < 0 || gy >= tamanho || gx >= tamanho) continue
        if (y === -1 || x === -1 || y === 7 || x === 7) grade[gy][gx] = false
      }
    }
  }
  finder(0, 0)
  finder(tamanho - 7, 0)
  finder(0, tamanho - 7)
  return grade
}

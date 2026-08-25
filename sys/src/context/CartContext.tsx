import {
  createContext, useContext, useEffect, useMemo, useReducer, type ReactNode,
} from 'react'
import type { Lang } from '../data/i18n'
import type { Preco } from '../data/produtos'

export type CartItem = {
  id: string
  titulo: { pt: string; en: string }
  marca: string
  preco: Preco
  qtd: number
  /** cena de origem — usada na miniatura e para mostrar "visto no Ep X" */
  img: string
  spot: { x: number; y: number }
  zoom: number
  dramaId: string
  dramaTitulo: { pt: string; en: string }
  ep: number
}

export type Pedido = {
  numero: string
  criadoEm: string
  itens: CartItem[]
  lang: Lang
  subtotal: number
  frete: number
  total: number
  moedas: number
  pagamento: string
  entrega: string
  email: string
  previsao: string
}

type State = { itens: CartItem[]; pedidos: Pedido[] }

type Action =
  | { type: 'ADD'; item: Omit<CartItem, 'qtd'> }
  | { type: 'REMOVE'; id: string }
  | { type: 'QTD'; id: string; delta: number }
  | { type: 'CLEAR' }
  | { type: 'PEDIDO'; pedido: Pedido }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const existente = state.itens.find((i) => i.id === action.item.id)
      if (existente) {
        return {
          ...state,
          itens: state.itens.map((i) =>
            i.id === action.item.id ? { ...i, qtd: i.qtd + 1 } : i
          ),
        }
      }
      return { ...state, itens: [...state.itens, { ...action.item, qtd: 1 }] }
    }
    case 'REMOVE':
      return { ...state, itens: state.itens.filter((i) => i.id !== action.id) }
    case 'QTD':
      return {
        ...state,
        itens: state.itens.flatMap((i) => {
          if (i.id !== action.id) return [i]
          const q = i.qtd + action.delta
          return q < 1 ? [] : [{ ...i, qtd: q }]
        }),
      }
    case 'CLEAR':
      return { ...state, itens: [] }
    case 'PEDIDO':
      return { ...state, pedidos: [action.pedido, ...state.pedidos] }
    default:
      return state
  }
}

function loadState(): State {
  try {
    return {
      itens: JSON.parse(localStorage.getItem('dv_cart') ?? '[]'),
      pedidos: JSON.parse(localStorage.getItem('dv_pedidos') ?? '[]'),
    }
  } catch {
    return { itens: [], pedidos: [] }
  }
}

type ContextValue = {
  itens: CartItem[]
  pedidos: Pedido[]
  /** total de unidades no carrinho */
  quantidade: number
  temNoCarrinho: (id: string) => boolean
  adicionar: (item: Omit<CartItem, 'qtd'>) => void
  remover: (id: string) => void
  alterarQtd: (id: string, delta: number) => void
  limpar: () => void
  registrarPedido: (pedido: Pedido) => void
  subtotal: (lang: Lang) => number
}

const CartContext = createContext<ContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    localStorage.setItem('dv_cart', JSON.stringify(state.itens))
    localStorage.setItem('dv_pedidos', JSON.stringify(state.pedidos))
  }, [state])

  const value = useMemo<ContextValue>(() => ({
    itens: state.itens,
    pedidos: state.pedidos,
    quantidade: state.itens.reduce((s, i) => s + i.qtd, 0),
    temNoCarrinho: (id) => state.itens.some((i) => i.id === id),
    adicionar: (item) => dispatch({ type: 'ADD', item }),
    remover: (id) => dispatch({ type: 'REMOVE', id }),
    alterarQtd: (id, delta) => dispatch({ type: 'QTD', id, delta }),
    limpar: () => dispatch({ type: 'CLEAR' }),
    registrarPedido: (pedido) => dispatch({ type: 'PEDIDO', pedido }),
    subtotal: (lang) => state.itens.reduce((s, i) => s + i.preco[lang] * i.qtd, 0),
  }), [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart fora do CartProvider')
  return ctx
}

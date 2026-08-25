import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react'

export type HistoricoItem = {
  info: string
  data: string
  valor: string
  pos: boolean
}

type State = {
  saldo: number
  desbloqueados: Set<string>
  historico: HistoricoItem[]
}

type Action =
  | { type: 'GASTAR'; amount: number; descricao: string; data: string }
  | { type: 'CREDITAR'; amount: number; descricao: string; data: string }
  | { type: 'DESBLOQUEAR'; chave: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'GASTAR':
      return {
        ...state,
        saldo: state.saldo - action.amount,
        historico: [
          { info: action.descricao, data: action.data, valor: `-${action.amount}`, pos: false },
          ...state.historico,
        ],
      }
    case 'CREDITAR':
      return {
        ...state,
        saldo: state.saldo + action.amount,
        historico: [
          { info: action.descricao, data: action.data, valor: `+${action.amount}`, pos: true },
          ...state.historico,
        ],
      }
    case 'DESBLOQUEAR':
      return {
        ...state,
        desbloqueados: new Set([...state.desbloqueados, action.chave]),
      }
    default:
      return state
  }
}

const DEFAULTS: Omit<State, 'desbloqueados'> & { desbloqueados: string[] } = {
  saldo: 2450,
  desbloqueados: [],
  historico: [
    { info: 'Pacote 500 moedas', data: 'Ontem • 19:15', valor: '+550', pos: true },
    { info: 'Anúncio assistido',  data: 'Ontem • 12:00', valor: '+10',  pos: true },
    { info: 'Bônus diário',       data: '2 dias atrás',  valor: '+25',  pos: true },
  ],
}

function loadState(): State {
  try {
    return {
      saldo: Number(localStorage.getItem('dv_saldo') ?? DEFAULTS.saldo),
      desbloqueados: new Set<string>(
        JSON.parse(localStorage.getItem('dv_desbloqueados') ?? '[]')
      ),
      historico: JSON.parse(
        localStorage.getItem('dv_historico') ?? JSON.stringify(DEFAULTS.historico)
      ),
    }
  } catch {
    return { saldo: DEFAULTS.saldo, desbloqueados: new Set(), historico: DEFAULTS.historico }
  }
}

function saveState(state: State) {
  localStorage.setItem('dv_saldo', String(state.saldo))
  localStorage.setItem('dv_desbloqueados', JSON.stringify([...state.desbloqueados]))
  localStorage.setItem('dv_historico', JSON.stringify(state.historico))
}

type ContextValue = {
  saldo: number
  desbloqueados: Set<string>
  historico: HistoricoItem[]
  gastar: (amount: number, descricao: string) => boolean
  creditar: (amount: number, descricao: string) => void
  desbloquear: (chave: string) => void
}

function agoraFormatado(): string {
  const now = new Date()
  const hora = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  return `Hoje • ${hora}`
}

const UserContext = createContext<ContextValue | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => { saveState(state) }, [state])

  function gastar(amount: number, descricao: string): boolean {
    if (state.saldo < amount) return false
    dispatch({ type: 'GASTAR', amount, descricao, data: agoraFormatado() })
    return true
  }

  function creditar(amount: number, descricao: string) {
    if (amount <= 0) return
    dispatch({ type: 'CREDITAR', amount, descricao, data: agoraFormatado() })
  }

  function desbloquear(chave: string) {
    dispatch({ type: 'DESBLOQUEAR', chave })
  }

  return (
    <UserContext.Provider value={{
      saldo: state.saldo,
      desbloqueados: state.desbloqueados,
      historico: state.historico,
      gastar,
      creditar,
      desbloquear,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser fora do UserProvider')
  return ctx
}

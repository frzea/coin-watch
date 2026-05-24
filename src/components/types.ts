export interface Position {
  id: string
  qty: number
  price: number
  date: string
}

export interface Todo{
    id: string
    text: string
    done: boolean
    date: string
}

export interface CoinData{
    positions: Position[]
    todos: Todo[]
}

export type UserCoinsToolsData = Record<string, CoinData>

export interface PNLProps{
    coinId : string
    lastPrice: number
    userCoinsToolsData: Record<string, CoinData>
    updateCoinTools: (updater:(coinData: CoinData) => CoinData) => void
}

export interface TodoProps{
    coinId : string
    userCoinsToolsData: Record<string, CoinData>
    updateCoinTools: (updater:(coinData: CoinData) => CoinData) => void
}
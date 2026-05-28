
/*export interface Position {
  id: string
  qty: number | null
  price: number | null
  date: string
}

export interface Todo{
    id: string
    text: string
    done: boolean
    date: string
}

export interface ToolsData{
    positions: Position[]
    todos: Todo[]
}

export type UserCoinsToolsData = Record<string, ToolsData>

export interface PNLProps{
    lastPrice: number
    CoinToolsData: ToolsData
    updateCoinTools: (updater:(toolsData: ToolsData) => ToolsData) => void
}*/

export interface TodoProps{
    CoinToolsData: ToolsData
    updateCoinTools: (updater:(toolsData: ToolsData) => ToolsData) => void
}

export interface CoinToolsProps{
    coinId: string
    lastPrice: number
}

export type UpdaterCoinData = (toolsData : ToolsData) => ToolsData

export interface Coin{
    id: string
    symbol: string
    current_price: number
    name: string
    fully_diluted_valuation: number
    high_24h: number
    low_24h: number
    price_change_percentage_24h: number
    total_volume: number
    image: string
    thumb: string
}

export interface CoinHeaderProps{
    hederData: Coin
}

export interface CoinData {
  topCoins: Coin[]
  userCoins: Coin[]
}

type BinanceCandle = [number, string, string, string, string, string, number, string, number, string, string, string];

export type BinanceData = BinanceCandle[]

export interface GrafProps {
  grafData: BinanceCandle[]
}


export interface SearchProps {
  addCoin: (coin: Coin) => void;
  removeCoin: (coin: Coin) => void;
}


export interface CoinListProps{
    data: Coin[]
    form: boolean
    addCoin: (coin: Coin) => void;
    removeCoin: (coin: Coin) => void;
}

export interface CoinsResponse {
  coins: Coin[];
}
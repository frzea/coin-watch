interface Position {
  id: string
  qty: number | null
  price: number | null
  date: string
}

interface Todo{
    id: string
    text: string
    done: boolean
    date: string
}

interface ToolsData{
    positions: Position[]
    todos: Todo[]
}

type UpdateCoinTools = (updater: (toolsData: ToolsData) => ToolsData) => void

type UserCoinsToolsData = Record<string, ToolsData>

type UpdaterCoinData = (toolsData : ToolsData) => ToolsData

interface CoinToolsProps{
    coinId: string
    lastPrice: number
}

export type {Position, Todo, ToolsData, UpdateCoinTools, UserCoinsToolsData, UpdaterCoinData, CoinToolsProps}
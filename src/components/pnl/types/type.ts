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

interface PNLProps{
    lastPrice: number
    CoinToolsData: ToolsData
    updateCoinTools: (updater:(toolsData: ToolsData) => ToolsData) => void
}

export type {Position, Todo, ToolsData, PNLProps}
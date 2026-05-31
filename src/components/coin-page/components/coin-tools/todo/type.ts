import { ToolsData,UpdateCoinTools } from '../types'

type EditState = {
    id: string
    text: string
}


interface TodoProps{
    CoinToolsData: ToolsData
    updateCoinTools: UpdateCoinTools
}

export type { TodoProps, EditState }
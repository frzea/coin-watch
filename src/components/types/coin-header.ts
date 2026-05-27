 interface Coin{
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

interface CoinHeaderProps{
    hederData: Coin
}

export type {CoinHeaderProps}
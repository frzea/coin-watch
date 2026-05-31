import { Coin } from '../types'

export interface CoinListProps{
    data: Coin[]
    form: boolean
    addCoin: (coin: Coin) => void;
    removeCoin: (coin: Coin) => void;
}
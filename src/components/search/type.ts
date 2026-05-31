import {Coin} from '../types'

interface SearchProps {
  addCoin: (coin: Coin) => void;
  removeCoin: (coin: Coin) => void;
}

interface CoinsResponse {
  coins: Coin[];
}

export type { SearchProps, CoinsResponse }
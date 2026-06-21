import { Coin } from '../types'

type CoinListMode = 'add' | 'remove' | 'view';

interface CoinListProps{
    data: Coin[]
    mode: CoinListMode;
}

export type {CoinListMode, CoinListProps}
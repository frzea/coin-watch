import { Coin } from '../components/types';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CoinStore {
   topCoins: Coin[]
   userCoins: Coin[]
   setTopCoins: (coins: Coin[]) => void
   addToUserCoins: (coin: Coin) => void
   removeUserCoin: (coin: Coin) => void
}


export const useCoinStore = create<CoinStore>()(
   persist((set,get) => ({
      
      topCoins: [],
      userCoins: [],

      setTopCoins: (coins) => set({ topCoins: coins }),

      addToUserCoins: (coin) => {
         if (get().userCoins.some(c => c.id === coin.id)) return
         set(state => ({ userCoins: [...state.userCoins, coin] }))
      },

      removeUserCoin: (coin) => {
         set(state => ({ userCoins: state.userCoins.filter(c => c.id !== coin.id) }))
      }

   }),
   { name: 'coins'}
));

import { Coin } from '../components/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCoins } from '../services/get-coins';

interface CoinStore {
   topCoins: Coin[]
   userCoins: Coin[]
   selectCoinId: string | null
   selectCoin: Coin | null
   setCoins: (topData: Coin[], userData: Coin[]) => void
   addToUserCoins: (coin: Coin) => void
   removeUserCoin: (coin: Coin) => void
   getCoinById: (id: string) => Coin
   setSelectedCoin: (id: string) => void
   syncCoins: () => Promise<void>
}


export const useCoinStore = create<CoinStore>()(
   persist((set,get) => ({
      
      topCoins: [],
      userCoins: [],
      selectCoinId: null,
      selectCoin: null,

      setCoins: ( topData, userData) => set({ topCoins: topData,  userCoins: userData }),

      addToUserCoins: (coin) => {
         if (get().userCoins.some(c => c.id === coin.id)) return
         set(state => ({ userCoins: [...state.userCoins, coin] }))
      },

      removeUserCoin: (coin) => {
         set(state => ({ userCoins: state.userCoins.filter(c => c.id !== coin.id) }))
      },

      getCoinById: (id) => {
         const { topCoins, userCoins } = get();
         return topCoins.find(c => c.id === id) ?? userCoins.find(c => c.id === id)
      },

      setSelectedCoin: (id) => {
         const coin = get().getCoinById(id);
         if(coin) set({ selectCoin : coin, selectCoinId: id});
      },

      syncCoins: async () => {
         const { userCoins } = get();
         const userCoinsID = (userCoins || []).map(c => c.id);
         const topCoinsURL: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10';
         const userCoinsURL: string = userCoinsID.length ?  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${userCoinsID}` : null;

         try{
            const result: [Coin[], Coin[]] = await Promise.all([
               getCoins(topCoinsURL),
               userCoinsURL ? getCoins(userCoinsURL) : Promise.resolve([])
            ]);

            const [topCoinsData, userCoinsData] = result;

            const userCoinsSorted = userCoinsID.map(id => userCoinsData.find(c => c.id === id)).filter(Boolean);

            set(({topCoins : topCoinsData, userCoins : userCoinsSorted}));
         } catch(err) {
            console.error('Ошибка загрузки монет:', err);
         }   
      }

   }),
   { name: 'coins'}
));

import { useEffect } from 'react'
import { CoinList } from './components/coin-list/coin-list.tsx'
import { Search } from './components/search/index.tsx'
import { getCoins } from './services/get-coins.tsx'
import { useLocalStorage } from './composable/useLocalStorage.ts' 
import { Coin, CoinData } from './components/types.tsx'
import './index.css'

import { Outlet } from "react-router-dom";


export default function App(){
  const [coinsData, setCoinsData] = useLocalStorage<CoinData>('coins', { topCoins: [], userCoins: [] });

  useEffect(() => {
    //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=true
    async function getData() {
      const storedData: CoinData = JSON.parse(localStorage.getItem('coins') || '{}');
      const userCoinsID = (storedData.userCoins || []).map(c => c.id);
      const topCoinsURL: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10';
      const userCoinsURL: string = userCoinsID.length ?  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${userCoinsID}` : null;

      try{
        const result: [Coin[], Coin[]] = await Promise.all([
          getCoins(topCoinsURL),
          userCoinsURL ? getCoins(userCoinsURL) : Promise.resolve([])
        ]);

        const [topCoinsData, userCoinsData] = result;

        const userCoinsSorted = userCoinsID.map(id => userCoinsData.find(c => c.id === id)).filter(Boolean);

        setCoinsData({ topCoins : topCoinsData, userCoins : userCoinsSorted });
      } catch(err) {
        console.error('Ошибка загрузки монет:', err);
      }
    };

    getData();

    const interval: number = setInterval(getData, 1 * 60 * 1000);

    return () => {
      clearInterval(interval)
    };

  },[]);

  function addCoin( coin: Coin ){
    if (coinsData.userCoins.some(c => c.id === coin.id)) return;
    setCoinsData({...coinsData, userCoins : [...coinsData.userCoins, coin]});
  }

  function removeCoin( coin: Coin ){
    const updated = coinsData.userCoins.filter(c => c.id !== coin.id);
    setCoinsData({...coinsData, userCoins : updated});
  }

  return ( 
    <>
      <div id="main">
        <div id ="sidebar">
          <Search addCoin={addCoin} removeCoin={removeCoin}/>
          <CoinList data={coinsData?.topCoins} form={true} addCoin={addCoin} removeCoin={removeCoin}/>
          <hr/>
          <CoinList data={coinsData?.userCoins} form={false} addCoin={addCoin} removeCoin={removeCoin}/>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
}

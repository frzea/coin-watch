import { useState, useEffect, useRef } from 'react'
import { CoinList } from './components/coin-list.jsx'
import { Search } from './components/search.jsx'
import { getCoins } from './services/get-coins.jsx'
import { useLocalStorage } from './custom-hooks/useLocalStorage.jsx' 
import './index.css'

import { Outlet } from "react-router-dom";


export default function App(){
  const [coinsData, setCoinsData] = useLocalStorage('coins', {topCoins : [], userCoins : []});

  useEffect(() => {
    
    async function getData() {
      const storedData = JSON.parse(localStorage.getItem('coins') || '{}');
      const userCoinsID = (storedData.userCoins || []).map(c => c.id);
      const topCoinsURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10';
      const userCoinsURL = userCoinsID.length ?  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${userCoinsID}` : null;

      try{
        const [topCoinsData, userCoinsData] = await Promise.all([
          getCoins(topCoinsURL),
          userCoinsURL ? getCoins(userCoinsURL) : Promise.resolve([])
        ]);

        const userCoinsSorted = userCoinsID.map(id => userCoinsData.find(c => c.id === id)).filter(Boolean);

        setCoinsData({ topCoins : topCoinsData, userCoins : userCoinsSorted });
      } catch(err) {
        console.error('Ошибка загрузки монет:', error);
      }
    };

    getData();

    const interval = setInterval(getData, 1 * 60 * 1000);

    return () => {
      clearInterval(interval)
    };

  },[]);

  function addCoin( coin ){
    if (coinsData.userCoins.some(c => c.id === coin.id)) return;
    setCoinsData({...coinsData, userCoins : [...coinsData.userCoins, coin]});
  }

  function removeCoin( coin ){
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

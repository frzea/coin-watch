import { useState, useEffect } from 'react'
import { CoinList } from './components/coin-list.jsx'
import { API } from './components/API.jsx'
import { Search } from './components/search.jsx'
import { getCoins } from './services/getCoins.jsx'
import { useLocalStorage } from './castom-hooks/useLocalStorage.jsx' 
import './index.css'

import { Outlet } from "react-router-dom";


export default function App(){
  const [allCoins, setAllCoins] = useState([]);
  const [userCoinsDATA, setUserCoinsDATA] = useState([]);
  const [userCoins, setUserCoins] = useLocalStorage('coins', []);


  useEffect(() => {
    /*async function getData() {
      const dataJSON = await getCoins('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10')
        console.log(dataJSON);
        setAllCoins(dataJSON);
    }
    getData();*/
    setAllCoins(API);
  }, []);

  useEffect(() => {

    if (userCoins.length === 0) {
      setUserCoinsDATA([]);
      return;
    }
    async function getUserCoinList() {
      const userCoinList = await getCoins(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${userCoins.join(',')}`);
      setUserCoinsDATA(userCoinList);
    }
    getUserCoinList(); 
  }, [userCoins]);

  function addCoin( coin ){
    if (userCoins.some(c => c.id === coin.id)) return;
    setUserCoins([...userCoins, coin]);
  }

  function removeCoin( coin ){
    const updated = userCoins.filter(item => item !== coin);
    setUserCoins(updated);
  }


  return ( 
    <>
      <div id="main">
        <div id ="sidebar">
          <Search addCoin={addCoin} removeCoin={removeCoin}/>
          <CoinList data={allCoins} form={'default'} addCoin={addCoin} removeCoin={removeCoin}/>
          <hr/>
          <CoinList data={userCoinsDATA} form={'user'} addCoin={addCoin} removeCoin={removeCoin}/>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
}
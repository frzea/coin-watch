import { useState, useEffect } from 'react'
import { CoinList } from './components/coinList.jsx'
import { API } from './components/API.jsx'
import { Search } from './components/search.jsx'
import { getCoins } from './services/getCoins.jsx' 
import './index.css'

import { Outlet } from "react-router-dom";


export default function App(){
  const [allCoins, setAllCoins] = useState([]);
  const [userCoinsDATA, setUserCoinsDATA] = useState([]);
  const [userCoins, setUserCoins] = useState(JSON.parse(localStorage.getItem('coins')) || []);



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


  // Синхронизация с localStore
  useEffect(()=>{
    localStorage.setItem('coins', JSON.stringify(userCoins));  
  },[userCoins]);

  function AddToLocalStorage( coin ){
    if(userCoins.includes(coin)) return;
    setUserCoins([...userCoins, coin]);
  }

  function DelLocalStorage( coin ){
    const updated = [...userCoins].filter(item => item !== coin);
    setUserCoins(updated);
  }


  return ( 
    <>
      <div id="main">
        <div id ="sidebar">
          <Search AddToLocalStorage={AddToLocalStorage} DelLocalStorage={DelLocalStorage}/>
          <CoinList data={allCoins} form={'default'} AddToLocalStorage={AddToLocalStorage} DelLocalStorage={DelLocalStorage}/>
          <hr/>
          <CoinList data={userCoinsDATA} form={'user'} AddToLocalStorage={AddToLocalStorage} DelLocalStorage={DelLocalStorage}/>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
}
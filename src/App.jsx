import { useState, useEffect } from 'react'
import { CoinList } from './coin-list.jsx'
import { API } from './API.jsx'
import './App.css'


export default function App(){
  const [allCoins, setAllCoins] = useState([]);
  const [userCoins, setUserCoins] = useState([]);

  //localStorage.clear();
  console.log(userCoins);

  useEffect(() => {
    /*async function getData() {
      const dataJSON = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10')
        .then(res => res.json())  
        console.log(dataJSON);
        setAllCoins(dataJSON);
    }
    getData();*/
    setAllCoins(API);
  }, []);


  function AddToLocalStorage( coin ){

    const current = JSON.parse(localStorage.getItem('coins')) || [];
    if(current.includes(coin)) return; // уже есть

    const updated = [...current, coin];
    localStorage.setItem('coins', JSON.stringify(updated));
    setUserCoins(updated);

    /*if(localStorage.getItem('coins') === null ){
        localStorage.setItem('coins',JSON.stringify([coin]));
    } else {
      localStorage.setItem('coins', JSON.stringify([...JSON.parse(localStorage.getItem('coins')), coin]));
    };
    setUserCoins(JSON.parse(localStorage.getItem('coins')));*/
  }


  return ( 
    <>
      <input placeholder="Add item" />
      <button>Добавить</button>
      <div>
        {allCoins.map(coin => (
            <li key={coin.id}> 
              <label>
              <img key={coin.id} src={coin.image} alt={coin.symbol} width="15" height="15" />
              {coin.name} --  {coin.current_price}
              </label>
              <button onClick={()=>{AddToLocalStorage(coin.symbol)}}>+</button>
              <button>-</button>
            </li>
          ) 
        )}
      </div>
      <hr/>
        <div>
        {[...allCoins].filter(coin => userCoins.includes(coin.symbol)).map(coin => (
            <li key={coin.id}> 
              <label>
              <img key={coin.id} src={coin.image} alt={coin.symbol} width="15" height="15" />
              {coin.name} --  {coin.current_price}
              </label>
              <button onClick={()=>{AddToLocalStorage(coin.symbol)}}>+</button>
              <button>-</button>
            </li>
          ) 
        )}
      </div>
    </>
  );
}
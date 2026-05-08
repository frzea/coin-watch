import { useState, useEffect } from 'react'
import './App.css'


export default function App(){

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10')
        .then(res => res.json())
        .then(data => console.log(data))
  }, [])

  return ( 
    <button> форму</button>
  );
}
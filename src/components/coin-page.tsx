import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoins } from "../services/get-coins.js";
import { Graf } from "./graf.jsx";
import { CoinTools } from "./coin-tools.tsx";
import { CoinHeader } from "./coin-header.js";

export function CoinPage(){
    const { coinId } = useParams();
    const [grafData, setGrafData] = useState<number[][]>([]);

    const storeData = JSON.parse(localStorage.getItem('coins'));
    const coinData = [...storeData.topCoins, ...storeData.userCoins];
    const coin = coinData.find(c => c.id === coinId);
    const coinSymbol = coin?.symbol?.toUpperCase();
    const symbol = coinSymbol?.endsWith('USDT') ? coinSymbol : `${coinSymbol}USDT`;
    
    useEffect(()=>{
        async function getData() {
            try{
                const  graf = await getCoins(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=168`);
                setGrafData(graf);
            } catch(err) {
                setGrafData([]);
            }
        }

        getData();
    },[coinId])

  return(
    <>
      <div id="coin-page">
        <Graf grafData={grafData}/>
      </div>
      <CoinHeader coinData={coin}/>
      <CoinTools coinId={coinId} lastPrice={coin.current_price}/>
    </>
  )
}
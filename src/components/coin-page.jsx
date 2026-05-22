import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoins } from "../services/getCoins";
import { Graf } from "./graf";
import { CoinTools } from "./coin-tools";
import { CoinHeader } from "./coin-header";

export function CoinPage(){
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState([]);
    const [grafData, setGrafData] = useState([]);

    useEffect(()=>{
        async function getData() {
            try{
                const [coin, graf] = await Promise.all([
                    getCoins(`https://api.coingecko.com/api/v3/coins/${coinId}`),
                    getCoins(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`)  
                ]);

                setCoinData(coin);
                setGrafData(graf);
            } catch(err) {
                console.error('Ошибка загрузки данных монеты: ', err);
            }
        }
        getData();
    },[coinId])

    const coinbaseTicker =  coinData?.tickers?.find(ticker => ticker.market.name === "Coinbase Exchange");

    return(
         (!coinData?.tickers) ? <div>Loading...</div> : <div id="coin-page">
            <Graf grafData={grafData}/>
            <CoinHeader coinData={coinData}/>
            <CoinTools coinId={coinId} lastPrice={coinbaseTicker?.last}/>
        </div>
    )
}

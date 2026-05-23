import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoins } from "../services/get-coins";
import { Graf } from "./graf";
import { CoinTools } from "./coin-tools";
import { CoinHeader } from "./coin-header";

export function CoinPage(){
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState([]);
    const [grafData, setGrafData] = useState([]);
    const [is, setIs] = useState(false);

    useEffect(()=>{
        async function getData() {
            try{
                const [coin, graf] = await Promise.all([
                                getCoins(`https://api.coingecko.com/api/v3/coins/${coinId}`),
                                getCoins(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`)  
                ]);
                console.log('вызов!"!!!');
                setCoinData(coin);
                setGrafData(graf);
            } catch(err) {
                console.error('Ошибка загрузки данных графика и тд: ', err);
            }
        }

        getData();
        //const interval = setTimeout(getData, 1 * 10 * 1000);

        //return () => clearTimeout(interval);

    },[is])



    const coinbaseTicker =  coinData?.tickers?.find(ticker => ticker.market.name === "Coinbase Exchange");

    return(
        <>
        <button type="button" onClick={()=>setIs(!is) }>ну</button>        
        <CoinTools coinId={coinId} lastPrice={coinbaseTicker?.last}/>
        </>
    )
}

/*


        <>
        { 
        (!coinData?.tickers) ? <div>Loading...</div> : 
        <div id="coin-page">
            <Graf grafData={grafData}/>
            <CoinHeader coinData={coinData}/>
        </div>
        }
        <CoinTools coinId={coinId} lastPrice={coinbaseTicker?.last}/>
        </>
*/
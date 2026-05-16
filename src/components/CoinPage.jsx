import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoins } from "../services/getCoins";
import { Graf } from "./graf";

export function CoinPage(){
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState([])
    const [grafData, setGrafData] = useState([]);

    useEffect(()=>{
        async function getData() {
            const dataJSON = await getCoins(`https://api.coingecko.com/api/v3/coins/${coinId}`);
            setCoinData(dataJSON);
        }
        getData();
    },[coinId])

    useEffect(()=>{
        async function getData() {
            const dataJSON = await getCoins(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
            setGrafData(dataJSON);
        }
        getData();    
    },[coinId])

    return(
        <>
        {coinData !==[] &&
            <div id="coinPage">
                <div id="graf">
                    {coinData !==[] && <Graf grafData={grafData}/>}
                </div>
                <div id="coinInfo">
                    <div>
                        <h1>{coinData?.tickers?.[0]?.base}  ({coinData?.localization?.en})</h1>
                    </div>
                    <div>
                        <h4>
                            Последняя цена:  {coinData?.tickers?.[0]?.last}
                        </h4>
                        <h4>
                            Капитализация:  {coinData?.tickers?.[0]?.coin_mcap_usd}
                        </h4>
                    </div>
                    <div>
                        Сылка на witelist: <a href={coinData?.links?.whitepaper}>{coinData?.links?.whitepaper}</a>
                    </div>
                     <hr/>
                    <div>
                        {coinData?.description?.en}
                    </div>
                </div>
            </div>
        }
        </>
    )
}
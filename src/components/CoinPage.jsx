import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoins } from "../services/getCoins";
import { Graf } from "./graf";
import { PNL } from "./PNL";

export function CoinPage(){
    const { coinId } = useParams();
    const [coinData, setCoinData] = useState([]);
    const [grafData, setGrafData] = useState([]);
    const [coinInfo, setCoinInfo] = useState(false);

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
        {coinData  &&
            <div id="coin-page">
                <div id="graf">
                    <Graf grafData={grafData}/>
                </div>
                <div>
                    <h1>
                        {coinData?.tickers?.[0]?.base}  ({coinData?.localization?.en}) 
                        <button onClick={()=> setCoinInfo(!coinInfo)}>
                            {(coinInfo) ? 'Close' : 'Open'} info
                        </button>
                    </h1>
                </div>
                {coinInfo && (
                    <div id="coinInfo">
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
                )}
                <div id="coin-tools">
                    <PNL key={coinId} coinId = {coinId} lastPrice={coinData?.tickers?.[0]?.last}/>
                    <div id="plan">
                        PLAN
                    </div>
                </div>
            </div>
        }
        </>
    )
}
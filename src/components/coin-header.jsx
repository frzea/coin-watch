import { useState } from "react";
import { CoinInfo } from "./coin-info";

export function CoinHeader({ coinData }){
    const [isCoinInfoOpen, setIsCoinInfoOpen] = useState(false);

    const coinbaseTicker =  coinData?.tickers?.find(ticker => ticker.market.name === "Coinbase Exchange");

    return(
        <>
            <h1>
                {coinbaseTicker?.base}  ({coinData?.localization?.en}) 
                <button type="button" onClick={()=> setIsCoinInfoOpen(prev => !prev)}>
                    {isCoinInfoOpen ? 'Close' : 'Open'} info
                </button>
            </h1>
            {isCoinInfoOpen && <CoinInfo coinData={coinData}/>}
        </>
    )
}
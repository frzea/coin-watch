import { useState } from "react";
import { CoinInfo } from "./coin-info";

export function CoinHeader({ coinData }){
    const [isCoinInfoOpen, setIsCoinInfoOpen] = useState(false);

    return(
        <>
            <h1>
                {coinData.name}  ({coinData.symbol.toUpperCase()}) 
                <button type="button" onClick={()=> setIsCoinInfoOpen(prev => !prev)}>
                    {isCoinInfoOpen ? 'Close' : 'Open'} info
                </button>
            </h1>

            {isCoinInfoOpen && <CoinInfo coinData={coinData}/>}
        </>
    )
}
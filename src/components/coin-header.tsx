import { useState } from "react";
import { CoinInfo } from "./coin-info.tsx";
import { CoinHeaderProps } from "./types.ts";

export function CoinHeader({ hederData }: CoinHeaderProps){
    const [isCoinInfoOpen, setIsCoinInfoOpen] = useState<boolean>(false);

    return(
        <>
            <h1>
                {hederData.name}  ({hederData.symbol.toUpperCase()}) 
                <button type="button" onClick={()=> setIsCoinInfoOpen(prev => !prev)}>
                    {isCoinInfoOpen ? 'Close' : 'Open'} info
                </button>
            </h1>

            {isCoinInfoOpen && <CoinInfo hederData={hederData}/>}
        </>
    )
}
import { useParams } from "react-router-dom";
import { Graf } from "./components/coin-graf/index.js";
import { CoinTools } from './components/coin-tools/index.tsx';
import { CoinHeader } from "./components/coin-header/coin-header.js";
import { useGrafData } from './components/coin-graf/useGrafData.ts'

export function CoinPage(){
    const { coinId } = useParams();
    const { data, coin  } = useGrafData(coinId);

  return(
    <>
      <div id="coin-page">
        <Graf data={data}/>
      </div>
      <CoinHeader hederData={coin}/>
      <CoinTools coinId={coinId} lastPrice={coin.current_price}/>
    </>
  )
}
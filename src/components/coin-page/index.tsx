import { useParams } from "react-router-dom";
import { Graf } from "./components/coin-graf/index.js";
import { CoinTools } from './components/coin-tools/index.tsx';
import { CoinHeader } from "./components/coin-header/coin-header.js";
import { useGrafData } from './components/coin-graf/useGrafData.ts';
import { useCoinStore } from '../../store/CoinStore.ts';

export function CoinPage(){
    const { coinId } = useParams();
    const { data } = useGrafData(coinId);
    const { selectCoin } = useCoinStore()

    if (!selectCoin) return null 

  return(
    <>
      <div id="coin-page">
        <Graf data={data}/>
      </div>
      <CoinHeader />
      <CoinTools />
    </>
  )
}
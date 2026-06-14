import { useParams } from "react-router-dom";
import { Graf } from "./components/coin-graf/index.js";
import { CoinTools } from './components/coin-tools/index.tsx';
import { CoinHeader } from "./components/coin-header/coin-header.js";
import { useGrafData } from './components/coin-graf/useGrafData.ts';
import { useCoinStore } from '../../store/CoinStore.ts';
import {Header} from '../header/index.tsx';

export function CoinPage(){
    const { coinId } = useParams();
    const { data } = useGrafData(coinId);
    const selectCoin = useCoinStore(store => store.selectCoin)

    if (!selectCoin) return null 

  return(
    <>
      <div className='px-3 flex-row items-center'>
        <Header />
        <div className="hidden  md:flex w-80 h-50"><Graf data={data}/></div>
        <CoinHeader />
        <CoinTools />
      </div>
    </>
  )
}
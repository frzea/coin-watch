import { useState,useEffect } from "react";
import { Coin } from '../../../types';
import { BinanceData } from './type';
import { getCoins } from '../../../../services/get-coins';
import { useCoinStore } from '../../../../store/CoinStore'



export function useGrafData(coinId: string){
   const [grafData, setGrafData] = useState<BinanceData>([]);
   const { getCoinById, setSelectedCoin } = useCoinStore();


   const coin: Coin = getCoinById(coinId);
   const coinSymbol = coin?.symbol?.toUpperCase();

   useEffect(()=>{

      setSelectedCoin(coinId);

      let cancelRequest = false;
      async function getData() {
         try{
            const symbol = coinSymbol?.endsWith('USDT') ? coinSymbol : `${coinSymbol}USDT`;
            const  graf: BinanceData = await getCoins(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=168`);
            if(!cancelRequest){
               setGrafData(graf);
            }
         } catch(err) {
            if(!cancelRequest){
               setGrafData([]);
            }  
         }
      }

      getData();

      return () =>{
         cancelRequest = true;
      }
   },[coinSymbol])


   const data = grafData?.map((candle) => ({
      date: new Date(candle[0]).toLocaleDateString(),
      price: parseFloat(candle[4])
   })) || []; 
   
   return { data }
}
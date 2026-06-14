import { useCoinStore } from "../store/CoinStore";
import { useEffect } from 'react';


export function useCoinSync(){
      const syncCoins = useCoinStore(store => store.syncCoins);
    
      useEffect(() => {
        
        //syncCoins();

        const interval: number = setInterval(syncCoins, 1 * 60 * 1000);
    
        return () => {
          clearInterval(interval)
        };
    
      },[]);

}
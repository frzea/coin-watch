import { CoinInfo } from "./components/coin-info.tsx";
import { useCoinStore } from '../../../../store/CoinStore.ts';

export function CoinHeader(){
   const coin = useCoinStore(store => store.selectCoin);

   const change = coin.price_change_percentage_24h ?? 0;
   const isPositive = change >= 0;

   return(
      <>
         <div className="flex shrink-0 py-5 items-center">
            <img src={coin.image ?? coin.thumb} alt={coin.id} width={30} height={30} className="rounded-full shrink-0 w-13 h-13 object-cover" />
            <div className="flex-row px-1">
               <div className="flex">
                  <div className="text-2xl mr-1"> 
                     {coin.name} 
                  </div>
                  <span className=" text-neutral-500 dark:text-neutral-400 flex justify-center">
                     {coin.symbol.toUpperCase()}
                  </span>
               </div> 
               <div className="text-2md flex min-w-0 items-center">
                  ${(coin.current_price ?? 0).toLocaleString('en-US', {minimumFractionDigits: 0,maximumFractionDigits: 2,})}
                  <span className={`text-xs font-medium px-1 py-1 mx-1 rounded w-auto flex justify-center  ${isPositive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                    {isPositive ? '+' : ''}{change.toFixed(2)}%
                  </span>
               </div>
            </div>
         </div>
          <CoinInfo />
      </>
   )
}

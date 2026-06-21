import  {useCoinToolsStore } from '../../../store/CoinToolsStore'
import { Coin } from '../../types'

export function HomemadeStat({ coin }: { coin: Coin }){
   const getCoinData = useCoinToolsStore(store => store.getCoinData);
   const coinData = getCoinData(coin.id);

   const positions = coinData?.positions ?? [];
   const sumQty = positions.reduce((sum, item) => sum + Number(item.qty), 0);
   const totalPrice = sumQty * coin.current_price;
   const change = coin.price_change_percentage_24h ?? 0;
   const isPositive = change >= 0;

   return(
      <>
         <div className="flex flex-col items-end min-w-0">
            {sumQty.toFixed(0)}
            <div className={`text-xs text-neutral-500 dark:text-neutral-400 lowercase`}>
               ${totalPrice.toFixed(2)}
            </div>
         </div>
         <div className={`text-xs font-medium px-2 py-1 rounded w-14 flex justify-center  ${isPositive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
         </div>
      </>
   )
}
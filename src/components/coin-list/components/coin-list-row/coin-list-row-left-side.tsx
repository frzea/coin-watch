import { Coin } from '../../../types'
import { Link } from "react-router-dom"

export function CoinListRowLeftSide({coin}: { coin: Coin }){
   return (
      <div className="flex items-center gap-3 min-w-0">
         <img src={coin.image ?? coin.thumb} alt={coin.id} width={28} height={28} className="rounded-full shrink-0" />
         <div className="flex flex-col min-w-0 text-neutral-900 dark:text-neutral-100">
            <Link to={'/coin/' + coin.id} className="font-semibold truncate">
               {coin.name}
            </Link>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 lowercase">
               {coin.symbol}
            </div>
         </div>
      </div>
   )
}
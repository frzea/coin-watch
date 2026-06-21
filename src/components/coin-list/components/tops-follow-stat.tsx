import { Coin } from '../../types'
import { CoinListMode } from '../type'
import { Plus, X ,Star} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCoinStore } from '../../../store/CoinStore';

export interface CoinListButtomProps{
    coin: Coin
    mode: CoinListMode;
}

export function CoinListTopsFollowStat({coin, mode}: CoinListButtomProps){
    const addToUserCoins = useCoinStore(store => store.addToUserCoins);
    const removeUserCoin = useCoinStore(store => store.removeUserCoin);
    const isInUserCoins = useCoinStore(store => store.userCoins.some(c => c.id === coin.id))

    const change = coin.price_change_percentage_24h ?? 0;
    const isPositive = change >= 0;

    return(
        <>
            <div className="flex flex-col items-end min-w-0">
               ${coin.current_price}
               <div className={`text-xs lowercase ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                  {change.toFixed(1)}{change && '%'}
               </div>
            </div>
            <Button 
               size="xs" 
               variant="outline" 
               disabled={mode === 'add' && isInUserCoins}
               onClick={() => mode ? addToUserCoins(coin) : removeUserCoin(coin)}
            >
               {mode === 'add' 
                  ? isInUserCoins 
                     ? <Star size={16} absoluteStrokeWidth />
                     : <Plus size={16} absoluteStrokeWidth />
                  : <X size={16} absoluteStrokeWidth />
               }
            </Button>
         </>
    )
}
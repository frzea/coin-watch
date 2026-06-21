import { PositionListProps } from './type';
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore';
import { Button } from "@/components/ui/button"
import {useCoinStore} from '../../../../../../../store/CoinStore'
import { X } from "lucide-react"


export function PositionList({pos, index}: PositionListProps) {
  const selectCoin = useCoinStore(store => store.selectCoin);
  const selectCoinId = useCoinToolsStore(state => state.selectCoinId);
  const removePosition = useCoinToolsStore(state => state.removePosition);


  const pnl = (selectCoin.current_price - pos.price) * pos.qty;
  const isPositive = pnl >= 0;
  const date = new Date(pos.date).toLocaleDateString('ru-RU');

  return (
    <div className="flex items-center justify-between text-xs sm:text-sm py-1 px-2 my-0.5 rounded-md  bg-neutral-100  dark:bg-neutral-800 sm:px-4 sm:py-1">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-7">
        <span className="text-muted-foreground">{ date }</span>
        <span className="text-muted-medium">×{pos.qty}</span>
        <span className="text-muted-foreground">price:</span>
        <span className="font-medium">
          ${pos.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className=" hidden text-muted-foreground text-xs md:block">pnl/pos</div>
        <span className={`text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'} sm:text-md`}>
          {isPositive ? '+' : '-'}${Math.abs(pnl).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </span>
        <Button variant="outline" size='xs' onClick={() => removePosition(selectCoinId, pos.id)}>
          <X size={16} absoluteStrokeWidth />
        </Button>
      </div>
    </div>
  )
}
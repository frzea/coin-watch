import { PositionListProps } from './type';
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore';
import { Button } from "@/components/ui/button"
import {useCoinStore} from '../../../../../../../store/CoinStore'


export function PositionList({pos, index}: PositionListProps) {
  const selectCoin = useCoinStore(store => store.selectCoin);
  const selectCoinId = useCoinToolsStore(state => state.selectCoinId);
  const removePosition = useCoinToolsStore(state => state.removePosition);

  const pnl = (selectCoin.current_price - pos.price) * pos.qty;
  const isPositive = pnl >= 0;

  const date = new Date(pos.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  return (
    <div className="flex items-center justify-between py-2 pl-2 pr-1 my-0.5 rounded-md  bg-neutral-100  dark:bg-neutral-800">
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">{date}</span>
        <span className="text-muted-foreground">×{pos.qty}</span>
        <span className="text-muted-foreground">по</span>
        <span className="font-medium">
          ${pos.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {isPositive ? '+' : '-'}${Math.abs(pnl).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </span>
        <Button
          onClick={() => removePosition(selectCoinId, pos.id)}
            className="w-auto h-auto flex items-center justify-center rounded-md text-xs
                     bg-neutral-200 hover:bg-red-500/20 hover:text-red-500
                     dark:bg-neutral-700 dark:hover:bg-red-500/20 dark:hover:text-red-500
                     text-muted-foreground transition-colors"
        >
          X
        </Button>
      </div>
    </div>
  )
}
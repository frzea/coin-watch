import { CoinListProps } from './type';
import { ScrollArea } from "@/components/ui/scroll-area"
import { CoinListRowLeftSide } from "./components/coin-list-row/coin-list-row-left-side";
import { CoinListRowRightSide } from "./components/coin-list-row/coin-list-row-right-side";

export function CoinList({ data = [], mode }: CoinListProps){
 return(
    <ScrollArea className="flex-1 h-full min-h-0 w-auto rounded-md md:pr-2.5">
    <div className="flex flex-1 flex-col gap-1 pb-5">
      {
        data.map(coin => 
          <div key={coin.id} className="flex text-xs items-center justify-between rounded-md bg-neutral-100  dark:bg-neutral-800 px-3 py-2 md:py-1 md:px-1.5">
            <CoinListRowLeftSide coin={coin}/>
            <CoinListRowRightSide coin={coin} mode={mode}/>
          </div>
        )
      }
    </div>
    </ScrollArea>
  )
}

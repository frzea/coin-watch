import { Coin } from '../../../types'
import { CoinListMode } from '../../../coin-list/type'
import { HomemadeStat } from "../homemade"
import { CoinListTopsFollowStat } from '../tops-follow-stat'

export interface CoinListRowRightSideProps{
    coin: Coin
    mode: CoinListMode;
}

export function CoinListRowRightSide({coin, mode}: CoinListRowRightSideProps){
   return (
      <div className="flex items-center  gap-2 min-w-0">
         {
            mode === 'view' ? <HomemadeStat coin={coin}/> : <CoinListTopsFollowStat coin={coin} mode={mode}/>
         }
      </div>
   )
}

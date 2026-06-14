import { useCoinStore } from '../../../../../store/CoinStore'
import { useCoinToolsStore } from '../../../../../store/CoinToolsStore'
import { Position } from '../../coin-tools/types'

export function useCoinInfoCalc(){
    const {selectCoin} = useCoinStore();
    const {selectCoinId,coinToolsData} = useCoinToolsStore();

    const positions : Position[] = coinToolsData[selectCoinId]?.positions ?? [];  

    const capitalization = positions.reduce((sum, item) => sum + Number(item.qty*selectCoin.current_price), 0);
    const totalInvested = positions.reduce((sum, p) => sum + Number(p.qty * p.price), 0);
    const profitLossPercent  = totalInvested > 0 ? ((capitalization - totalInvested) / totalInvested) * 100 : 0;
    const isPositive = profitLossPercent >= 0;
    const totalQty = positions.reduce((sum, p) => sum + Number(p.qty), 0);
    const avgPrice = positions.reduce((sum, p) => sum + Number(p.price), 0)/ totalQty;

    
    return {capitalization, totalInvested, profitLossPercent, isPositive,  pnl: capitalization - totalInvested, totalQty, avgPrice} 
}
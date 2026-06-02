import { ToolsData } from '../../types.ts';
import { useCoinStore } from '../../../../../../store/CoinStore.ts';

export function calcPNL(CoinToolsData: ToolsData) {
  const lastPrice = useCoinStore(store => store.selectCoin.current_price)

  const positions = CoinToolsData.positions ?? [];  
  const totalInvested = positions.reduce((sum, p) => sum + p.qty * p.price, 0);
  const currentValue = positions.reduce((sum, p) => sum + p.qty * lastPrice, 0);
  
  return { totalInvested, positions, pnl: currentValue - totalInvested };
}
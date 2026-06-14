import { useCoinStore } from '../../../../../../store/CoinStore.ts';
import { useCoinToolsStore } from '../../../../../../store/CoinToolsStore.ts';

export function calcPNL() {
  const selectCoin = useCoinStore(store => store.selectCoin);
  const selectCoinId = useCoinStore(store => store.selectCoinId);
  const coinToolsData = useCoinToolsStore(store => store.coinToolsData);

  const positions = coinToolsData[selectCoinId]?.positions ?? [];  
  const totalInvested = positions.reduce((sum, p) => sum + p.qty * p.price, 0);
  const currentValue = positions.reduce((sum, p) => sum + p.qty * selectCoin.current_price, 0);
  
  return { totalInvested, positions, pnl: currentValue - totalInvested };
}
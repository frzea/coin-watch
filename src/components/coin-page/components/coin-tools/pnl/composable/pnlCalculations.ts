import { ToolsData } from '../../types.ts'

export function calcPNL(CoinToolsData: ToolsData, lastPrice: number) {
  const positions = CoinToolsData.positions ?? [];  
  const totalInvested = positions.reduce((sum, p) => sum + p.qty * p.price, 0);
  const currentValue = positions.reduce((sum, p) => sum + p.qty * lastPrice, 0);
  
  return { totalInvested, positions, pnl: currentValue - totalInvested };
}
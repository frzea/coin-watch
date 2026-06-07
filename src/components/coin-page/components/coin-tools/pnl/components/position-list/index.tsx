import { PositionListProps } from './type';
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore';


export function PositionList({pos, index}: PositionListProps){
   const selectCoinId = useCoinToolsStore(state => state.selectCoinId)
   const removePosition = useCoinToolsStore(state => state.removePosition)
   return(
      <li>
         {`${index + 1}. Дата: ${pos.date} Кол: ${pos.qty} Цена: ${pos.price}`} 
         <button onClick={() => removePosition(selectCoinId, pos.id)}>-</button>
      </li>
   )
}
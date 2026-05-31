import { PositionListProps } from './type'

export function PositionList({pos, index, onRemove}: PositionListProps){
   return(
      <li>
         {`${index + 1}. Дата: ${pos.date} Кол: ${pos.qty} Цена: ${pos.price}`} 
         <button onClick={() => onRemove(pos.id)}>-</button>
      </li>
   )
}
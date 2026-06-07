import { TodoItempProps } from './type';
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore';

export function TodoItem({item, startEdit}: TodoItempProps){
   const selectCoinId  = useCoinToolsStore(store => store.selectCoinId);
   const removeTodo  = useCoinToolsStore(store => store.removeTodo);
   const updateTodo  = useCoinToolsStore(store => store.updateTodo);

   return(
      <li>
         {`${item.text}  Дата: ${new Date(item.date).toLocaleString()}`}
         <input type='checkbox' checked={item.done} onChange={e => updateTodo(selectCoinId, item.id, {done : e.target.checked})}/>
         <button onClick={() => startEdit(item.id, item.text)}>edit</button>
         <button onClick={() => removeTodo(selectCoinId, item.id)} >X</button> 
      </li> 
   )
}
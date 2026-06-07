import { AddTodoItemProps } from "./type";
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore';

export function AddTodoItem({newCommit, updateCommit} : AddTodoItemProps){
   const selectCoinId = useCoinToolsStore(store => store.selectCoinId);
   const addTodo = useCoinToolsStore(store => store.addTodo);
   return(
      <>
         PLAN 
         <input type="text" value={newCommit.text} onChange={e => updateCommit(e.target.value)}/> 
         <button onClick={() => addTodo(selectCoinId, newCommit)}>Add</button>
      </>
   )
}
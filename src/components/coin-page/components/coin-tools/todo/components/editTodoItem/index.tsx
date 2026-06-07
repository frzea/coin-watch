import { EditTodoItemProps } from "./type";
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore';


export function EditTodoItem({item, editState, updateText, stopEdit} : EditTodoItemProps){
   const selectCoinId = useCoinToolsStore(state => state.selectCoinId)
   const updateTodo = useCoinToolsStore(state => state.updateTodo)
   
   return(
      <div key={item.id}>
      <input type="text" value={editState.text ?? ''} onChange={e=> updateText(e.target.value)}/>
      <button onClick={()=> {updateTodo(selectCoinId, item.id, {text : editState?.text ?? item.text, date: new Date().toISOString()}); stopEdit()}}>save</button>
      <button onClick={stopEdit}>esc</button> 
      </div>
   )
}
import { EditTodoItemProps } from "./type";


export function EditTodoItem({item, editState, updateText, stopEdit, handleEditCommit} : EditTodoItemProps){
   return(
      <div key={item.id}>
      <input type="text" value={editState?.text ?? ''} onChange={e=> updateText(e.target.value)}/>
      <button onClick={()=> {handleEditCommit(item.id, {text : editState?.text ?? '', date: new Date().toISOString()}); stopEdit()}}>save</button>
      <button onClick={stopEdit}>esc</button> 
      </div>
   )
}
import { TodoItempProps } from './type'

export function TodoItem({item, startEdit, handlRemoveCommit, handleEditCommit}: TodoItempProps){
   return(
      <li>
         {`${item.text}  Дата: ${new Date(item.date).toLocaleString()}`}
         <input type='checkbox' checked={item.done} onChange={e => handleEditCommit(item.id, {done : e.target.checked})}/>
         <button onClick={() => startEdit(item.id, item.text)}>edit</button>
         <button onClick={() => handlRemoveCommit(item.id)} >X</button> 
      </li> 
   )
}
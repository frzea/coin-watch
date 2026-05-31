import { AddTodoItemProps } from "./type"

export function AddTodoItem({newCommit, updateCommit, handleAddCommit} : AddTodoItemProps){
   return(
      <>
         PLAN 
         <input type="text" value={newCommit.text} onChange={e => updateCommit(e.target.value)}/> 
         <button onClick={handleAddCommit}>Add</button>
      </>
   )
}
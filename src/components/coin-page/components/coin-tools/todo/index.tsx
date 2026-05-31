import { TodoProps } from "./type";
import { useTaskScheduler } from './composable/useTaskScheduler';
import { useEditState } from './composable/useEditState';
import { EditTodoItem } from './components/editTodoItem/index';
import { TodoItem } from './components/todoItem/index';
import { AddTodoItem } from './components/addTodoItem/index'; 

export function TaskScheduler({CoinToolsData, updateCoinTools}: TodoProps){
   const { editState, updateText, startEdit, stopEdit, isEditing } = useEditState();
   const { newCommit, updateCommit, handleAddCommit, handleEditCommit, handlRemoveCommit} = useTaskScheduler(updateCoinTools);

   return(
      <>
         <AddTodoItem 
            newCommit={newCommit} 
            updateCommit={updateCommit} 
            handleAddCommit={handleAddCommit}
         />
         <hr/>
         {CoinToolsData.todos?.map(item =>
            isEditing(item.id) 
            ? <EditTodoItem 
                  key={item.id} 
                  item={item} 
                  editState={editState} 
                  updateText={updateText}
                  stopEdit={stopEdit}
                  handleEditCommit={handleEditCommit}
            />
            : <TodoItem 
                  key={item.id}
                  item={item}
                  startEdit={startEdit} 
                  handlRemoveCommit={handlRemoveCommit}
                  handleEditCommit={handleEditCommit}
            /> 
         )}
      </>
   )
}

import { useTaskScheduler } from './composable/useTaskScheduler';
import { useEditState } from './composable/useEditState';
import { EditTodoItem } from './components/editTodoItem/index';
import { TodoItem } from './components/todoItem/index';
import { AddTodoItem } from './components/addTodoItem/index'; 
import { useCoinToolsStore } from '../../../../../store/CoinToolsStore';

export function TaskScheduler(){
   const selectCoinId = useCoinToolsStore(store => store.selectCoinId);
   const getCoinData = useCoinToolsStore(store => store.getCoinData);
   const { editState, updateText, startEdit, stopEdit, isEditing } = useEditState();
   const { newCommit, updateCommit} = useTaskScheduler();

   const CoinToolsData = getCoinData(selectCoinId);
   return(
      <>
         <AddTodoItem 
            newCommit={newCommit} 
            updateCommit={updateCommit} 
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
            />
            : <TodoItem 
                  key={item.id}
                  item={item}
                  startEdit={startEdit}
            /> 
         )}
      </>
   )
}

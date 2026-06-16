import { useTaskScheduler } from './composable/useTaskScheduler';
import { useEditState } from './composable/useEditState';
import { EditTodoItem } from './components/editTodoItem/index';
import { TodoItem } from './components/todoItem/index';
import { AddTodoItem } from './components/addTodoItem/index'; 
import { useCoinToolsStore } from '../../../../../store/CoinToolsStore';
import { useToggle } from '../../../../../composable/useToggle.ts'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function TaskScheduler(){
   const {toggleValue, toggle} = useToggle(false);
   const {selectCoinId} = useCoinToolsStore();
   const getCoinData = useCoinToolsStore(store => store.getCoinData);
   const { editState, updateText, startEdit, stopEdit, isEditing } = useEditState();
   const { newCommit, updateCommit} = useTaskScheduler();

   const CoinToolsData = getCoinData(selectCoinId);
   return(
      <div id ="Todo" className="flex flex-col flex-1 min-h-0 mb-3">
         {toggleValue && (
            <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50" onClick={toggle}>
               <div className="bg-white dark:bg-neutral-900  px-5 py-2 shadow-xl border border-white w-2/3" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between mb-3">
                     <h2 className="text-lg font-bold">Add todo</h2>
                     <button onClick={toggle}>✕</button>
                  </div>

                  <AddTodoItem 
                     newCommit={newCommit} 
                     updateCommit={updateCommit}
                     toggle={toggle}
                  />
               </div>
            </div>
         )}
         <ScrollArea className="h-full min-h-0 w-auto rounded-md border pr-3">
         <div className="flex flex-col">
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
         </div>
         </ScrollArea>
         <button
            onClick={toggle}
            className="shrink-0 w-full mt-2 py-2 text-sm text-muted-foreground border border-dashed border-border rounded-lg hover:bg-muted transition-colors"
            >
            + Add todo
         </button>
      </div>
   )
}

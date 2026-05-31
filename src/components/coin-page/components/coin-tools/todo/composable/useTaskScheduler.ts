import { useState } from 'react';
import { Todo } from '../../types';
import { UpdateCoinTools } from '../../types' 

const EMPTY_TODO: Todo = { id: '' , text : '', done : false, date : ''};

export function useTaskScheduler(updateCoinTools: UpdateCoinTools){
   const [newCommit, setNewCommit] = useState<Todo>(EMPTY_TODO)

   function updateCommit(comitText: string){
      setNewCommit({
         ...newCommit, 
         id : crypto.randomUUID(), 
         text: comitText, 
         date: new Date().toISOString()
      })
   }

   function handleAddCommit(){
      updateCoinTools((toolsData)=>({
         ...toolsData, 
         todos : [...toolsData.todos, newCommit]
      }))
      setNewCommit(EMPTY_TODO)
   }

   function handleEditCommit(id: string, update: Partial<Todo>){
      updateCoinTools((toolsData)=>({
         ...toolsData, 
         todos : toolsData.todos.map(dataid =>
            (dataid.id === id) 
            ? 
            {...dataid, ...update} 
            : 
            dataid
         )
      }));  
   }

   function handlRemoveCommit(id: string){
      updateCoinTools((toolsData)=>({
         ...toolsData, 
         todos : toolsData.todos.filter(dataid => dataid.id !== id)
      }));  
   }



   return { 
      newCommit,
      updateCommit,
      handleAddCommit,
      handleEditCommit,
      handlRemoveCommit
   }
} 






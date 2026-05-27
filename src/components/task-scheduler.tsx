import { useState } from "react";
import { Todo, TodoProps } from "./types";

export function TaskScheduler({CoinToolsData, updateCoinTools}: TodoProps){
    const [isEdit, setIsEdit] = useState<string>('');
    const [editCommit, setEditCommit] = useState<string>('');
    const [newCommit, setNewCommit] = useState<Todo>({ id: '' , text : '', done : false, date : ''})

    function updateValCommit(comitText: string){
       setNewCommit( {...newCommit, id : crypto.randomUUID(), text: comitText, date: new Date().toISOString()} )
    }

    function handleAddCommit(){
        updateCoinTools((toolsData)=>({
            ...toolsData, 
            todos : [...toolsData.todos, newCommit]
        }))
        setNewCommit({ id: '' , text : '', done : false, date : ''})
    }

    function handleEditCommit(id: string, commit: string){
        updateCoinTools((toolsData)=>({
            ...toolsData, 
            todos : toolsData.todos.map(dataid =>
                    (dataid.id === id) ? {...dataid, text: commit, date: new Date().toISOString()} : dataid
            )
        }));
        setIsEdit('');    
    }

    return(
        <>
            PLAN 
            <input type="text" value={newCommit.text} onChange={e => updateValCommit(e.target.value)}/> 
            <button onClick={()=> {handleAddCommit()}}>Add</button>
            <hr/>
            {CoinToolsData.todos?.map(item =>
                (isEdit === item.id) ? 
                <div>
                    <input key={item.id} type="text" value={editCommit} onChange={e=> setEditCommit(e.target.value)}/>
                    <button onClick={()=> {handleEditCommit(item.id, editCommit)}}>save</button>
                    <button onClick={()=> setIsEdit('')}>esc</button> 
                </div>
                :
                <li key={item.id}>
                    {`${item.text}  Дата: ${new Date(item.date).toLocaleString()}`}
                    <button onClick={()=>{setIsEdit(item.id); setEditCommit(item.text)}}>edit</button>
                    <button>X</button> 
                </li>      
            )}
        </>
    )
}

import { useState } from "react";

export function TaskScheduler({coinId, userPlanCommits, updateCoinTools}){
    const [isEdit, setIsEdit] = useState('');
    const [editCommit, setEditCommit] = useState('');
    const [newCommit, setNewCommit] = useState({ id: '' , text : '', done : false, date : ''})

    function updateValCommit(comitText){
       setNewCommit( {...newCommit, id : crypto.randomUUID(), text: comitText, date: new Date().toISOString()} )
    }

    function handleAddCommit(){
        updateCoinTools((coinData)=>({
            ...coinData, 
            todos : [...coinData.todos, newCommit]
        }))
        setNewCommit({ id: '' , text : '', done : false, date : ''})
    }

    function handleEditCommit(id, commit){
        updateCoinTools((coinData)=>({
            ...coinData, 
            todos : coinData.todos.map(dataid =>
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
        {userPlanCommits?.[coinId]?.todos?.map(item =>
            ((isEdit === item.id) ? 
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
            ) 
        )
        }
        </>
    )
}



import { useState } from "react";

export function TaskSeduler({coinId, userPlanCommits, updateCoinTools}){
    const [isEdit, setIsEdit] = useState('');
    const [editCommit, setEditCommit] = useState('');
    const [newCommit, setNewCommit] = useState({ id: '' , text : '', done : false, date : ''})

    function saveCommit(comitText){
       setNewCommit( {...newCommit, id : crypto.randomUUID(), text: comitText, date: new Date().toISOString()} )
    }

    return(
        <>
        PLAN 
        <input type="text" value={newCommit.text} onChange={e => saveCommit(e.target.value)}/> 
        <button onClick={()=>{
                updateCoinTools((coinData)=>({...coinData, todos : [...coinData.todos, newCommit]}))
                setNewCommit({ id: '' , text : '', done : false, date : ''})
            }
        }>Add</button>
        <hr/>
        {userPlanCommits?.[coinId]?.todos?.map(item =>
            ((isEdit == item.id) ? 
            <div>
                <input type="text" value={editCommit} onChange={e=> setEditCommit(e.target.value)}/>
                <button onClick={()=>{
                     updateCoinTools((coinData)=>({...coinData, todos : coinData.todos.map(dataid =>{
                       return (dataid.id == item.id) ? {...dataid, text:editCommit, date: new Date().toISOString()} : dataid
                     }
                     )}));
                    setIsEdit('')
                    }
                }>save</button>
                <button onClick={()=>setIsEdit('')}>esc</button> 
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


/*
    console.log(isEdit);
    console.log(userPlanCommits);
*/
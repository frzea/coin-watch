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




    export {updateValCommit, handleAddCommit, handleEditCommit}
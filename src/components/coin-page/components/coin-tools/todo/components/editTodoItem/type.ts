import { Todo } from "../../../types";
import { EditState } from '../../type' 

export interface EditTodoItemProps{
    item: Todo
    editState: EditState
    updateText: (text: string) => void
    stopEdit: ()=> void
    handleEditCommit: (id: string, update: Partial<Todo>)=> void
}


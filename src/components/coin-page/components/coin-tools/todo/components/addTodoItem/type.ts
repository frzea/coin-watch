import { Todo } from "../../../types"

export interface AddTodoItemProps{
   newCommit: Todo
   updateCommit: (comitText: string) => void
   handleAddCommit: () => void
}
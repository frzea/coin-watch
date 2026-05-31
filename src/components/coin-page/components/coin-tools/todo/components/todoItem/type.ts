import { Todo } from "../../../types";

export interface TodoItempProps {
    item: Todo
    startEdit: (id: string, text: string) => void
    handlRemoveCommit: (id: string) => void
    handleEditCommit: (id: string, update: Partial<Todo>) => void
}
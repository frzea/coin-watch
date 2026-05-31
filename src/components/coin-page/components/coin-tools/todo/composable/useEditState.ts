import { useState } from 'react';
import { EditState } from '../type'


type UseEditStateReturn = {
   editState:  EditState | null
   updateText: (text: string) => void;
   startEdit: (id: string, text: string) => void
   stopEdit: () => void
   isEditing: (id: string) => boolean
}

export function useEditState(): UseEditStateReturn{
    const [ editState, setEditState] = useState<EditState | null>(null);

    const startEdit = (id: string, text: string) => setEditState({ id: id, text: text });
    const stopEdit = () => setEditState(null);
    const isEditing = (id : string) => editState?.id === id;
    const updateText = (text: string) =>  setEditState(prev => prev ? {...prev, text} : null);

    return { editState, updateText, startEdit, stopEdit, isEditing }

}
import { EditTodoItemProps } from "./type";
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore';
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field"


export function EditTodoItem({item, editState, updateText, stopEdit} : EditTodoItemProps){
   const selectCoinId = useCoinToolsStore(state => state.selectCoinId)
   const updateTodo = useCoinToolsStore(state => state.updateTodo)
   
   return(
      <div key={item.id}>
      <FieldLabel>
        <Field orientation="horizontal">
          <FieldContent>
            <Textarea
              value={editState.text ?? ''}
              onChange={e => updateText(e.target.value)}
            />
          </FieldContent>
            <button onClick={()=> {updateTodo(selectCoinId, item.id, {text : editState?.text ?? item.text, date: new Date().toISOString()}); stopEdit()}}>save</button>
            <button onClick={stopEdit}>esc</button> 
        </Field>
      </FieldLabel>
      </div>
   )
}
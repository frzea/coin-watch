import { TodoItempProps } from './type';
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore';
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"

export function TodoItem({item, startEdit}: TodoItempProps){
   const {selectCoinId}  = useCoinToolsStore();
   const removeTodo  = useCoinToolsStore(store => store.removeTodo);
   const updateTodo  = useCoinToolsStore(store => store.updateTodo);

   return(
      <div>
       <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" checked={item.done} onCheckedChange={e => updateTodo(selectCoinId, item.id, {done : e})}/>
          <FieldContent>
            <FieldTitle>{item.text}</FieldTitle>
            <FieldDescription className='text-sm'>
              {new Date(item.date).toLocaleString()}
            </FieldDescription>
          </FieldContent>
         <button onClick={() => startEdit(item.id, item.text)}>edit</button>
         <button onClick={() => removeTodo(selectCoinId, item.id)} >X</button> 
        </Field>
      </FieldLabel>
      </div>
   )
}

/*
         <input type='checkbox' checked={item.done} onChange={e => updateTodo(selectCoinId, item.id, {done : e.target.checked})}/>
         {`${item.text}  Дата: ${new Date(item.date).toLocaleString()}`}
         <button onClick={() => startEdit(item.id, item.text)}>edit</button>
         <button onClick={() => removeTodo(selectCoinId, item.id)} >X</button> 
*/
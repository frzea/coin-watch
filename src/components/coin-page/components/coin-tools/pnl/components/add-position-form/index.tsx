import { AddPositionFormProps } from './type.ts'

export function AddPositionForm({newPosition,setNewPosition,handleAddPosition}: AddPositionFormProps){
   return(
      <>
         Количество: <input type="number" min={0} value={newPosition.qty} onChange={e => setNewPosition({...newPosition, qty : Number(e.target.value)})}/><br/>
         Цена: <input type="number" min={0} value={newPosition.price} onChange={e => setNewPosition({...newPosition, price : Number(e.target.value)})}/><br/>
         Дата: <input type="date" value={newPosition.date} onChange={e => setNewPosition({...newPosition, date : e.target.value})}/><br/>
         <button onClick={()=>{handleAddPosition()}}>Добавить</button>
      </>
   )
}
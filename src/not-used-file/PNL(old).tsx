import { useState } from "react";
import { Position, PNLProps } from "../types";
//import { usePNL} from "./composable/usePNL";

export function PNL({ CoinToolsData, lastPrice, updateCoinTools} : PNLProps){
   //const [addPNL, setAddPNL] = useState<boolean>(false);
   const [newPosition, setNewPosition] = useState<Position>({id: '',  qty : null, price : null, date : ''})

   const {addPNL, toggelAddPNL } = usePNL();


   function handleAddPosition(){

      const posWithID: Position = {...newPosition, id : crypto.randomUUID()};

      updateCoinTools( (toolsData) => ({
         ...toolsData, 
         positions:[...toolsData.positions, posWithID]
      }));
      setNewPosition({id: '', qty: null, price: null, date: '' });
   }

   function handleRemovePosition(removeID: String){
     updateCoinTools((toolsData)=>({
         ...toolsData, 
         positions : [...toolsData.positions].filter(position => position.id != removeID)}
      ))   
   }

   const positions = CoinToolsData.positions ?? [];
   const totalInvested = positions.reduce((sum, p) => sum + p.qty * p.price, 0);
   const currentValue = positions.reduce((sum, p) => sum + p.qty * lastPrice, 0);
   const pnl = currentValue - totalInvested;

   return(
      <div id ="PNL">
         PNL
         <button onClick={toggelAddPNL}>
            { addPNL ? 'Close' : 'Add'} 
         </button>
         {addPNL && <div id="add-PNL">
               Количество: <input type="number" min={0} value={newPosition.qty} onChange={e=> setNewPosition({...newPosition, qty : Number(e.target.value)})}/><br/>
               Цена: <input type="number" min={0} value={newPosition.price} onChange={e=> setNewPosition({...newPosition, price : Number(e.target.value)})}/><br/>
               Дата: <input type="date" value={newPosition.date} onChange={e=> setNewPosition({...newPosition, date : e.target.value})}/><br/>

               <button onClick={()=>{handleAddPosition()}}>Добавить</button>
            </div>
         }
         <hr/>
         {CoinToolsData.positions?.map((pos, i) =>
            <li key={i}>
               {`${i+1}. Дата: ${pos.date} Кол: ${pos.qty} Цена: ${pos.price}   `} 
               <button onClick={()=>{handleRemovePosition(pos.id)}}>-</button>
            </li>
         )}

         <p>pnl:  {pnl}$ Всего вложенно: {totalInvested}$</p>
      </div>
   )
}

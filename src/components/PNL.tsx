import { useState } from "react";
import { Position, PNLProps } from "./types";

export function PNL({ coinId, lastPrice, userCoinsToolsData, updateCoinTools} : PNLProps){
   const [addPNL, setAddPNL] = useState<boolean>(false);
   const [newPosition, setNewPosition] = useState<Position>({id: '',  qty : 0, price : 0, date : ''})


   function handleAddPosition(){

      const posWithID: Position = {...newPosition, id : crypto.randomUUID()};

      updateCoinTools( (coinData) => ({
         ...coinData, 
         positions:[...coinData.positions, posWithID]
      }));
      setNewPosition({id: '', qty: 0, price: 0, date: '' });
   }

   function handleRemovePosition(removeID: String){
     updateCoinTools((coinData)=>({
         ...coinData, 
         positions : [...coinData.positions].filter(position => position.id != removeID)}
      ))   
   }

   const positions = userCoinsToolsData?.[coinId]?.positions || [];
   const totalInvested = positions.reduce((sum, p) => sum + p.qty * p.price, 0);
   const currentValue = positions.reduce((sum, p) => sum + p.qty * lastPrice, 0);
   const pnl = currentValue - totalInvested;

   return(
      <div id ="PNL">
         PNL
         <button onClick={()=> setAddPNL(!addPNL)}>
            {(addPNL) ? 'Close' : 'Add'} 
         </button>
         {addPNL && <div id="add-PNL">
               Количество: <input type="text" value={newPosition.qty} onChange={e=> setNewPosition({...newPosition, qty : Number(e.target.value)})}/><br/>
               Цена: <input type="text" value={newPosition.price} onChange={e=> setNewPosition({...newPosition, price : Number(e.target.value)})}/><br/>
               Дата: <input type="date" value={newPosition.date} onChange={e=> setNewPosition({...newPosition, date : e.target.value})}/><br/>
               <button onClick={()=>{handleAddPosition()}}>Добавить</button>
            </div>
         }
         <hr/>
         {userCoinsToolsData?.[coinId]?.positions?.map((pos, i) =>
            <li key={i}>
               {`${i+1}. Дата: ${pos.date} Кол: ${pos.qty} Цена: ${pos.price}   `} 
               <button onClick={()=>{handleRemovePosition(pos.id)}}>-</button>
            </li>
         )}

         <p>pnl:  {pnl}$ Всего вложенно: {totalInvested}$</p>
      </div>
   )
}

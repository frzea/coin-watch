import { useState } from "react";
import { Position, PNLProps } from "./types";

export function PNL({ CoinToolsData, lastPrice, updateCoinTools} : PNLProps){
    
   return(
      <div id ="PNL">
         PNL
         <button onClick={()=> setAddPNL(!addPNL)}>
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

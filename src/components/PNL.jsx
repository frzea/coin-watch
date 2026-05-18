import { useState } from "react";

export function PNL({ coinId, lastPrice, userPnlPosition, updateCoinTools}){
   const [addPNL, setAddPNL] = useState(false);
   const [newPosition, setNewPosition] = useState({qty : '', price : '', date : ''})



   const totalInvested = userPnlPosition[coinId].positions.reduce((sum, p) => sum + p.qty * p.price, 0);
   const currentValue = userPnlPosition[coinId].positions.reduce((sum, p) => sum + p.qty * lastPrice, 0);
   const pnl = currentValue - totalInvested;
   const InvestSum = userPnlPosition[coinId].positions.reduce((sum, p) => sum + p.qty * p.price, 0);

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
               <button onClick={()=>{
                  updateCoinTools((coinData) => ({...coinData, positions:[...coinData.positions, newPosition]}));
                  setNewPosition({ qty: '', price: '', date: '' });
                  }}>
                  Добавить
               </button>
            </div>
         }
         <hr/>
         {userPnlPosition?.[coinId]?.positions?.map((pos, i) =>
            <li key={i}>
               {`${i+1}. Дата: ${pos.date} Кол: ${pos.qty} Цена: ${pos.price}   `} 
               <button onClick={()=> updateCoinTools((coinData)=>(
                  {...coinData, positions : [...coinData.positions].filter((item,index)=> index != i)}
               ))}>
               -
               </button>
            </li>
         )}

         <p>pnl:  {pnl}$ Всего вложенно: {InvestSum}$</p>
      </div>
   )
}

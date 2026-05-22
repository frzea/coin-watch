import { useState } from "react";

export function PNL({ coinId, lastPrice }){
  const [addPNL, setAddPNL] = useState(false);
  const [newPosition, setNewPosition] = useState({qty : '', price : '', date : ''})
  // Получение даных с LS иначе созадем пустой обьект
  const [userPnlPosition, setUserPnlPosition] = useState(JSON.parse(localStorage.getItem('userCoinTools')) || {});

  console.log(userPnlPosition);


  function addCoinTools(){
    // Получаем даные по монете, иначе создаем пустой обьет-каркас
    const coinData = userPnlPosition[coinId] || { positions: [], todos: [] };
    // Заполняем купленные позиции
    const newCoinData = {...coinData, positions : [...coinData.positions, newPosition]}
    // Переписываем даные по монете
    const result = {...userPnlPosition, [coinId] :  newCoinData}
    // Обновляем состояние монетки
    setUserPnlPosition(result);
    // Добавляем в LS результат
    localStorage.setItem('userCoinTools', JSON.stringify(result));
    // Обнуляем поля
    setNewPosition({ qty: '', price: '', date: '' });
  }

  function removePosition(pos){
    console.log(pos);
    const coinData = userPnlPosition[coinId] || { positions: [], todos: [] };
    const newCoinData = {...coinData, positions : [...coinData.positions].filter((i, index) => index != pos)}
    const result = {...userPnlPosition, [coinId] :  newCoinData}
    setUserPnlPosition(result);
    localStorage.setItem('userCoinTools', JSON.stringify(result));
  }

  const totalInvested = userPnlPosition[coinId].positions.reduce((sum, p) => sum + p.qty * p.price, 0);
  const currentValue = userPnlPosition[coinId].positions.reduce((sum, p) => sum + p.qty * lastPrice, 0);
  const pnl = currentValue - totalInvested;
  const InvestSum = userPnlPosition[coinId].positions.reduce((sum, p) => sum + p.qty * p.price, 0);

  return (
    <>
      <div id ="PNL">
        PNL
        <button onClick={()=> setAddPNL(!addPNL)}>
          {(addPNL) ? 'Close' : 'Add'} 
        </button>
        {addPNL &&
          <div id="add-PNL">
              Количество: <input type="text" value={newPosition.qty} onChange={e=> setNewPosition({...newPosition, qty : Number(e.target.value)})}/><br/>
              Цена: <input type="text" value={newPosition.price} onChange={e=> setNewPosition({...newPosition, price : Number(e.target.value)})}/><br/>
              Дата: <input type="date" value={newPosition.date} onChange={e=> setNewPosition({...newPosition, date : e.target.value})}/><br/>
              <button onClick={()=>addCoinTools(newPosition)}>Добавить</button>
          </div>
        }
        <hr/>
        {userPnlPosition[coinId]?.positions?.map((pos, i) =>
            <li key={i}>
              {`${i+1}. Дата: ${pos.date} Кол: ${pos.qty} Цена: ${pos.price}   `} 
              <button onClick={()=> removePosition(i)}>-</button>
            </li>
        )}

        <p>pnl:  {pnl}$ Всего вложенно: {InvestSum}$</p>
      </div>
    </>
  )
}
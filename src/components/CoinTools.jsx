import { useState } from "react";
import { PNL } from "./PNL"

export function CoinTools({coinId, lastPrice}){
    const [userCoinsToolsData, setUserCoinsToolsData] = useState(JSON.parse(localStorage.getItem('userCoinTools')) || {});

    
    
    function updateCoinTools(updater){
        // Получаем даные по монете, иначе создаем пустой обьет-каркас
        const coinData = userCoinsToolsData[coinId] || { positions: [], todos: [] };
        // Заполняем купленные позиции
        const newCoinData = updater(coinData);
        // Переписываем даные по монете
        const result = {...userCoinsToolsData, [coinId] :  newCoinData}
        // Обновляем состояние монетки
        setUserCoinsToolsData(result);
        // Добавляем в LS результат
        localStorage.setItem('userCoinTools', JSON.stringify(result));
    }

    return(
        <div id="coin-tools">
            <PNL coinId={coinId} lastPrice={lastPrice} userPnlPosition={userCoinsToolsData} updateCoinTools={updateCoinTools}/>
        </div>
    )
}
import { PNL } from "./PNL"
import { TaskSeduler } from "./task-scheduler";
import { useLocalStorage } from "../castom-hooks/useLocalStorage";

export function CoinTools({coinId, lastPrice}){
    const [userCoinsToolsData, setUserCoinsToolsData] = useLocalStorage('userCoinTools', {});

    function updateCoinTools(updater){
        // Получаем даные по монете, иначе создаем пустой обьет-каркас
        const coinData = userCoinsToolsData[coinId] ?? { positions: [], todos: [] };
        // Заполняем купленные позиции
        const newCoinData = updater(coinData);
        // Переписываем даные по монете
        const result = {...userCoinsToolsData, [coinId] :  newCoinData}
        // Обновляем состояние монетки
        setUserCoinsToolsData(result);
    }

    return(
        <div id="coin-tools">
            <div>
                <PNL coinId={coinId} lastPrice={lastPrice} userPnlPosition={userCoinsToolsData} updateCoinTools={updateCoinTools}/>
            </div>
            <div>
                <TaskSeduler coinId={coinId} userPlanCommits={userCoinsToolsData} updateCoinTools={updateCoinTools}/>
            </div>
        </div>
    )
}
import { PNL } from "./PNL"
import { TaskScheduler } from "./task-scheduler";
import { useLocalStorage } from "../custom-hooks/useLocalStorage";
import { CoinData, UserCoinsToolsData } from "./types";

export function CoinTools({coinId, lastPrice}){
    const [userCoinsToolsData, setUserCoinsToolsData] = useLocalStorage<UserCoinsToolsData>('userCoinTools', {});

    function updateCoinTools(updater: (coinData:CoinData)=> CoinData): void{
        const coinData = userCoinsToolsData[coinId] ?? { positions: [], todos: [] };
        const newCoinData = updater(coinData);
        const result = {...userCoinsToolsData, [coinId] :  newCoinData}
        setUserCoinsToolsData(result);
    }

    return(
        <div id="coin-tools">
            <div>
                <PNL coinId={coinId} lastPrice={lastPrice} userCoinsToolsData={userCoinsToolsData} updateCoinTools={updateCoinTools}/>
            </div>
            <div>
                <TaskScheduler coinId={coinId} userCoinsToolsData={userCoinsToolsData} updateCoinTools={updateCoinTools}/>
            </div>
        </div>
    )
}
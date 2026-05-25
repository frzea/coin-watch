import { PNL } from "./PNL"
import { TaskScheduler } from "./task-scheduler";
import { useLocalStorage } from "../custom-hooks/useLocalStorage.js";
import { ToolsData, UserCoinsToolsData, CoinToolsProps,UpdaterCoinData, } from "./types";

export function CoinTools({coinId, lastPrice}: CoinToolsProps){


    const [userCoinsToolsData, setUserCoinsToolsData] = useLocalStorage<UserCoinsToolsData>('userCoinTools', {});
    

    function updateCoinTools(updater: UpdaterCoinData): void{
        const coinData: ToolsData = userCoinsToolsData[coinId] ?? { positions: [], todos: [] };
        const newToolsData = updater(coinData);
        const resultToolsData: UserCoinsToolsData = {...userCoinsToolsData, [coinId] :  newToolsData}
        setUserCoinsToolsData(resultToolsData);
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
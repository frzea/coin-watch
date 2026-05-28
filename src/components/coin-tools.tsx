import { PNL } from "./pnl/index.js"
import { TaskScheduler } from "./task-scheduler";
import { useLocalStorage } from "../custom-hooks/useLocalStorage.js";
import { ToolsData, UserCoinsToolsData, CoinToolsProps,UpdaterCoinData, } from "./types";
import { useCallback, useMemo } from "react";

export function CoinTools({coinId, lastPrice}: CoinToolsProps){
    const [userCoinsToolsData, setUserCoinsToolsData] = useLocalStorage<UserCoinsToolsData>('userCoinTools', {});
    
    const CoinToolsData = useMemo(
        () => userCoinsToolsData?.[coinId] ?? { positions: [], todos: [] },
    [userCoinsToolsData, coinId]);

    const updateCoinTools = useCallback((updater: UpdaterCoinData): void => {
        setUserCoinsToolsData(prev => {
            const coinData: ToolsData = prev[coinId] ?? { positions: [], todos: [] };
            const newToolsData = updater(coinData);
            return {...prev, [coinId] :  newToolsData};  
        });
    }, [coinId]);

    return(
        <div id="coin-tools">
            <div>
                <PNL CoinToolsData={CoinToolsData} lastPrice={lastPrice}  updateCoinTools={updateCoinTools}/>
            </div>
            <div>
                <TaskScheduler CoinToolsData={CoinToolsData} updateCoinTools={updateCoinTools}/>
            </div>
        </div>
    )
}
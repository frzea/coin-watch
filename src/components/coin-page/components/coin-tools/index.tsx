import { useCallback, useMemo } from "react";
import { PNL } from "./pnl/index"
import { TaskScheduler } from "./todo/index";
import { useLocalStorage } from "../../../../composable/useLocalStorage";
import {CoinToolsProps,UserCoinsToolsData, UpdaterCoinData, ToolsData} from './types'

const EMPTY_TOOLS_DATA: ToolsData = { positions: [], todos: [] }

export function CoinTools({coinId, lastPrice}: CoinToolsProps){
    const [userCoinsToolsData, setUserCoinsToolsData] = useLocalStorage<UserCoinsToolsData>('userCoinTools', {});
    
    const CoinToolsData = useMemo(
        () => userCoinsToolsData?.[coinId] ?? EMPTY_TOOLS_DATA,
    [userCoinsToolsData, coinId]);

    const updateCoinTools = useCallback((updater: UpdaterCoinData): void => {
        setUserCoinsToolsData(prev => {
            const coinData: ToolsData = prev[coinId] ?? EMPTY_TOOLS_DATA;
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
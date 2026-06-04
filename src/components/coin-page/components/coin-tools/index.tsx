import { useCallback, useMemo } from "react";
import { PNL } from "./pnl/index"
import { TaskScheduler } from "./todo/index";
import { useLocalStorage } from "../../../../composable/useLocalStorage";
import { UserCoinsToolsData, UpdaterCoinData, ToolsData } from './types';
import { useCoinStore } from '../../../../store/CoinStore';
import { useCoinToolsStore } from '../../../../store/CoinToolsStore';


const EMPTY_TOOLS_DATA: ToolsData = { positions: [], todos: [] }

export function CoinTools(){
    //const { setToolsData } = useCoinToolsStore();
    const [userCoinsToolsData, setUserCoinsToolsData] = useLocalStorage<UserCoinsToolsData>('userCoinTools', {});
    const { selectCoinId } = useCoinStore();


    const CoinToolsData = useMemo(
        () => userCoinsToolsData?.[selectCoinId] ?? EMPTY_TOOLS_DATA,
    [userCoinsToolsData, selectCoinId]);

    const updateCoinTools = useCallback((updater: UpdaterCoinData): void => {
        setUserCoinsToolsData(prev => {
            const coinData: ToolsData = prev[selectCoinId] ?? EMPTY_TOOLS_DATA;
            const newToolsData = updater(coinData);
            return {...prev, [selectCoinId] :  newToolsData};  
        });
    }, [selectCoinId]);


    return(
        <div id="coin-tools">
            <div>
                <PNL CoinToolsData={CoinToolsData}  updateCoinTools={updateCoinTools}/>
            </div>
            <div>
                <TaskScheduler CoinToolsData={CoinToolsData} updateCoinTools={updateCoinTools}/>
            </div>
        </div>
    )
}
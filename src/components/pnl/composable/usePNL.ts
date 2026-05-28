import { useCallback, useState } from "react"
import { Position, PNLProps } from '../types/type.ts'


const EMPTY_POSITION: Position = {id: '',  qty : null, price : null, date : ''}

export function usePNL({CoinToolsData, lastPrice, updateCoinTools} : PNLProps){
       const [addPNL, setAddPNL] = useState<boolean>(false);
       const [newPosition, setNewPosition] = useState<Position>(EMPTY_POSITION);


    const toggelAddPNL = useCallback(()=> setAddPNL(v => !v), []);

    function handleAddPosition(){

      const posWithID: Position = {...newPosition, id : crypto.randomUUID()};

      updateCoinTools( (toolsData) => ({
          ...toolsData, 
          positions:[...toolsData.positions, posWithID]
      }));
      setNewPosition(EMPTY_POSITION);
    }

    function handleRemovePosition(removeID: String){
     updateCoinTools((toolsData)=>({
         ...toolsData, 
         positions : [...toolsData.positions].filter(position => position.id != removeID)}
      ))   
    }

    const positions = CoinToolsData.positions ?? [];
    const totalInvested = positions.reduce((sum, p) => sum + p.qty * p.price, 0);
    const currentValue = positions.reduce((sum, p) => sum + p.qty * lastPrice, 0);
    const pnl = currentValue - totalInvested;


    return { 
      addPNL, 
      toggelAddPNL, 
      handleAddPosition,
       handleRemovePosition, 
       totalInvested, 
       pnl,
       newPosition,
       setNewPosition,
       positions 
    }
    
}
import { useState } from "react"
import { Position, UpdateCoinTools } from '../../types.ts'


const EMPTY_POSITION: Position = {id: '',  qty : 0, price : 0, date : ''}

export function usePNLPosition(updateCoinTools : UpdateCoinTools){
    const [newPosition, setNewPosition] = useState<Position>(EMPTY_POSITION);

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

    return {
      newPosition,
      setNewPosition, 
      handleAddPosition,
      handleRemovePosition
    }
    
}

import { PNLProps } from "./type.ts";
import { usePNLPosition } from "./composable/usePNLPosition.ts";
import { useToggle } from '../../../../../composable/useToggle.ts'
import { AddPositionForm } from "./components/add-position-form/index.tsx";
import { PositionList } from "./components/position-list/index.tsx";
import { calcPNL } from "./composable/pnlCalculations.ts";

export function PNL({lastPrice, CoinToolsData, updateCoinTools}: PNLProps){
   const {toggleValue, toggle} = useToggle(false);
   const {handleAddPosition, handleRemovePosition, newPosition, setNewPosition } = usePNLPosition(updateCoinTools);
   const {totalInvested, positions, pnl} = calcPNL(CoinToolsData, lastPrice);

   return(
      <div id ="PNL">
         PNL
         <button onClick={toggle}>{ toggleValue ? 'Close' : 'Add'}</button>
         {toggleValue && 
            <AddPositionForm 
               newPosition={newPosition}
               setNewPosition={setNewPosition}
               handleAddPosition={handleAddPosition}
            />}
         <hr/>
         <ul>
            {positions?.map((pos, i) =>
               <PositionList 
                  key={pos.id} 
                  pos={pos} 
                  index={i} 
                  onRemove={handleRemovePosition} 
               />
            )}
         </ul>

         <p>pnl:  {pnl}$ Всего вложенно: {totalInvested}$</p>
      </div>
   )
}

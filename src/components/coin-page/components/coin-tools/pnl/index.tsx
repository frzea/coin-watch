import { useState } from "react"
import { useToggle } from '../../../../../composable/useToggle.ts'
import { AddPositionForm } from "./components/add-position-form/index.tsx";
import { PositionList } from "./components/position-list/index.tsx";
import { calcPNL } from "./composable/pnlCalculations.ts";
import { Position } from "../types.ts";

 const today = new Date().toISOString().split('T')[0];

const EMPTY_POSITION: Position = {id: '',  qty : 0, price : 0, date : today}

export function PNL(){
   const {toggleValue, toggle} = useToggle(false);
   const [newPosition, setNewPosition] = useState<Position>(EMPTY_POSITION);  
   const {totalInvested, positions, pnl} = calcPNL();

   return(
      <div id ="PNL" className="mb-3">
         {toggleValue && (
            <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50" onClick={toggle}>
               <div className="bg-white dark:bg-neutral-900  px-5 py-2 shadow-xl border border-white" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between">
                     <h2 className="text-lg font-bold">Add position</h2>
                     <button onClick={toggle}>✕</button>
                  </div>

                  <AddPositionForm 
                     newPosition={newPosition}
                     setNewPosition={setNewPosition}
                     toggle={toggle}
                  />
               </div>
            </div>
         )}
         <div className="flex-row">
            {positions?.map((pos, i) => (
               <PositionList key={pos.id} pos={pos} index={i} />
            ))}
         </div>
         <button
            onClick={toggle}
            className="w-full mt-2 py-2 text-sm text-muted-foreground border border-dashed border-border rounded-lg hover:bg-muted transition-colors"
            >
            + Add position
         </button>
      </div>
   )
}

import { AddPositionFormProps } from './type.ts';
import { useCoinToolsStore } from '../../../../../../../store/CoinToolsStore.ts'
import { useCoinStore } from '../../../../../../../store/CoinStore.ts'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AddPositionForm({newPosition,setNewPosition, toggle}: AddPositionFormProps){
   const selectCoinId = useCoinToolsStore(state => state.selectCoinId)
   const addPosition = useCoinToolsStore(state => state.addPosition)
   const selectCoin = useCoinStore(state => state.selectCoin)
   const addToPurchasedCoins = useCoinStore(state => state.addToPurchasedCoins)

   const today = new Date().toISOString().split('T')[0];

   return(
      <>
         <div className='flex flex-col gap-2'>
            <div className="space-y-1">
               <Label>Qty</Label>
               <div className="relative">
                  <Input
                     type="number"
                     placeholder="0.00"
                     min={0}
                     onChange={e => setNewPosition({...newPosition, qty : Number(e.target.value)})}
                  />
               </div>
            </div>
            <div className="space-y-1">
               <Label>Price</Label>
               <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                     type="number"
                     placeholder="0.00"
                     className="pl-7"
                     min={0}
                     onChange={e => setNewPosition({...newPosition, price : Number(e.target.value)})}
                  />
               </div>
            </div>
            <div className="space-y-1">
               <Label>Date</Label>
               <div className="relative">
                  <Input
                     type="date"
                     defaultValue={newPosition.date}
                     onChange={e => setNewPosition({...newPosition, date : e.target.value})}
                  />
               </div>
            </div>
            <Button className="w-auto mt-2" onClick={() => {addPosition(selectCoinId, newPosition); addToPurchasedCoins(selectCoin); toggle()} }>Добавить</Button>
         </div>
      </>
   )
}
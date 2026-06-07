import { useToggle } from "../../../../composable/useToggle.ts";
import { CoinInfo } from "./components/coin-info.tsx";
import { useCoinStore } from '../../../../store/CoinStore.ts';

export function CoinHeader(){
   const {toggleValue, toggle} = useToggle(false);
   const selectCoin = useCoinStore(store => store.selectCoin);

   return(
      <>
         <h1>
            {selectCoin.name}  ({selectCoin.symbol.toUpperCase()}) 
            <button type="button" onClick={toggle}>
               {toggleValue ? 'Close' : 'Open'} info
            </button>
         </h1>

         {toggleValue && <CoinInfo />}
      </>
   )
}
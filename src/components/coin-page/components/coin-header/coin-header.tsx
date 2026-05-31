import { useToggle } from "../../../../composable/useToggle.ts";
import { CoinInfo } from "./components/coin-info.tsx";
import { CoinHeaderProps } from './type.ts';

export function CoinHeader({ hederData }: CoinHeaderProps){
   const {toggleValue, toggle} = useToggle(false);

   return(
      <>
         <h1>
            {hederData.name}  ({hederData.symbol.toUpperCase()}) 
            <button type="button" onClick={toggle}>
               {toggleValue ? 'Close' : 'Open'} info
            </button>
         </h1>

         {toggleValue && <CoinInfo hederData={hederData}/>}
      </>
   )
}
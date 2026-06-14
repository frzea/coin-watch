import { useDarkMode } from '../../composable/useDarkMode.ts'
import { Switch } from "@/components/ui/switch"

export function Header(){
   const { ChangeMode } = useDarkMode(true);

   return(
      <div className='flex justify-between pt-3'>
         <div>HOLDNote</div>
         <Switch onClick={ChangeMode}/>
      </div>
   )
}
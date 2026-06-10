import { CoinList } from '../coin-list/coin-list';
import { useSearch } from './useSearch';
import { Input } from "@/components/ui/input";
import { InputSpinner } from "@/components/ui/InputSpinner";

export function Search(){
   const {resultSearchList, loading, handleChangeSearch } = useSearch();

   return(
      <>
         <div className='mt-5 px-5'>
            <Input className='mb-5' placeholder='Add coin...' onChange={handleChangeSearch} />
            <InputSpinner  onChange={handleChangeSearch} isLoading={loading}/>
         </div>
         {loading || <CoinList data={resultSearchList} form={true}/>
         }
         <hr/>
      </>
   )
}
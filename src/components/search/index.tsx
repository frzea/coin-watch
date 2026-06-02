import { CoinList } from '../coin-list/coin-list';
import { useSearch } from './useSearch';

export function Search(){
   const {resultSearchList, loading, handleChangeSearch } = useSearch();

   return(
      <>
         <input placeholder="Add item" onChange={handleChangeSearch}/>
         <hr/>
         {loading 
            ? <div>Loading...</div>
            : <CoinList data={resultSearchList} form={true}/>
         }
         <hr/>
      </>
   )
}
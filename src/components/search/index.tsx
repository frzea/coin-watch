import { CoinList } from '../coin-list/coin-list';
import { useSearch } from './useSearch';
import { SearchProps } from './type'

export function Search({ addCoin,  removeCoin}: SearchProps){
   const {resultSearchList, loading, handleChangeSearch } = useSearch();

   return(
      <>
         <input placeholder="Add item" onChange={handleChangeSearch}/>
         <hr/>
         {loading 
            ? <div>Loading...</div>
            : <CoinList data={resultSearchList} form={true} addCoin={addCoin} removeCoin={removeCoin}/>
         }
         <hr/>
      </>
   )
}
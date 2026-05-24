import { useState, useEffect } from 'react'
import { getCoins } from '../services/get-coins.jsx';
import { CoinList } from './coin-list.jsx';

export function Search({ addCoin, removeCoin }){
    const [strSearch, setStrSearch] = useState('');
    const [resultSearchList, setResultSearchList] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(()=>{

        if (strSearch === '') {
            setResultSearchList([]);
            setLoading(false);
            return;
        }

        const dilaySearch = setTimeout(async () => {
            try{
                const resultFind = await getCoins(`https://api.coingecko.com/api/v3/search?query=${strSearch}`);
                setResultSearchList(resultFind.coins);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false); 
            }
  
        }, 3000);

        return ()=>{
          clearTimeout(dilaySearch);  
        };
    },[strSearch]);

    function handleChangeSearch(e){
        setStrSearch(e.target.value);
        setLoading(true); 
    }

    return(
        <>
            <input placeholder="Add item" onChange={e => handleChangeSearch(e)}/>
            <hr/>
            {
                loading && (<div>Loading...</div>) || <CoinList data={resultSearchList} form={true} addCoin={addCoin} removeCoin={removeCoin}/>
            }
            <hr/>
        </>
    )
}
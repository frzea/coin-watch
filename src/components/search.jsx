import { useState, useEffect } from 'react'
import { getCoins } from '../services/getCoins.jsx';
import { CoinList } from './coinList.jsx';

export function Search({ AddToLocalStorage, DelLocalStorage }){
    const [strSearch, setStrSearch] = useState('');
    const [resultSearchList, setResultSearchList] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(resultSearchList);

    useEffect(()=>{

        if (strSearch === '') {
            setResultSearchList([]);
            return;
        }

        const dilaySearch = setTimeout(async () => {
            const resultFind = await getCoins(`https://api.coingecko.com/api/v3/search?query=${strSearch}`);
            setResultSearchList(resultFind.coins);  
        }, 3000);

        

        return ()=>{
          clearTimeout(dilaySearch);  
        };
    },[strSearch]);

    return(
        <>
            <input placeholder="Add item" onChange={e => setStrSearch(e.target.value)}/>
            <button >Добавить</button>
            <hr/>
            {loading && (<div>Loading...</div>)}
            <CoinList data={resultSearchList} form={'add'} AddToLocalStorage={AddToLocalStorage} DelLocalStorage={DelLocalStorage}/>
            <hr/>
        </>
    )
}
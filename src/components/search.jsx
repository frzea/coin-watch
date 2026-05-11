import { useState, useEffect } from 'react'
import { getCoins } from '../services/getCoins.jsx';

export function Search(){
    const [strSearch, setStrSearch] = useState('');
    const [state, setState] = useState('default');

    /*async function findCoin(strFind){

       const resultFind = await fetch(`https://api.coingecko.com/api/v3/search?query=${strFind}`).then(result => result.json())
       console.log(resultFind);
    }*/
    /*
    async function findCoin(strFind) {
        const resultFind =  new Promise(resolve => {
            setTimeout(()=>{fetch(`https://api.coingecko.com/api/v3/search?query=${strFind}`).then(result => result.json())}, 3000);
        })
        console.log(resultFind); 
    }*/

    useEffect(()=>{
        const dilaySearch = setTimeout(async () => {
            const resultFind = await getCoins(strSearch);
            console.log(resultFind);    
        }, 3000);

        return ()=>{
          clearTimeout(dilaySearch);  
        };
    },[strSearch]);

    return(
        <>
            <input placeholder="Add item" onChange={e => setStrSearch(e.target.value)}/>
            <button /*onClick={() => findCoin(strSearch)} disabled={state == 'Search' && true}*/ >Добавить</button>
            <hr/>
            <div>Loading...</div>
            <hr/>
        </>
    )
}
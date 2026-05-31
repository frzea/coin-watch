import { useState, useEffect } from 'react';
import { getCoins } from '../../services/get-coins.tsx';
import {CoinsResponse } from './type.ts';
import { Coin } from '../types.ts';

export function useSearch(){
    const [strSearch, setStrSearch] = useState<string>('');
    const [resultSearchList, setResultSearchList] = useState<Coin[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(()=>{

        if (strSearch === '') {
            setResultSearchList([]);
            setLoading(false);
            return;
        }

        const dilaySearch = setTimeout(async () => {
            try{
                const resultFind: CoinsResponse = await getCoins(`https://api.coingecko.com/api/v3/search?query=${strSearch}`);
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

    function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>){
        setStrSearch(e.target.value);
        setLoading(true); 
    }

    return { resultSearchList, loading, handleChangeSearch } 
}
import { useState } from 'react';


export function CoinList({ data, form, AddToLocalStorage, DelLocalStorage }){
    return(
      <>
        <div>
          {data.map(coin => (
              <li key={coin.id}> 
                <img src={ form=='add'&& coin.thumb || coin.image } alt={coin.id} width="15" height="15" />
                {coin.name} --  {coin.current_price}
                {form == 'default' && <button onClick={()=>{AddToLocalStorage(coin.id)}}>+</button>}
                {form == 'user' && <button onClick={()=>{DelLocalStorage(coin.id)}} >-</button>}
                {form == 'add' && <button onClick={()=>{AddToLocalStorage(coin.id)}}>+++</button>}
              </li>
            ) 
          )}
        </div>
      </>
    )
}




/*
  return ( 
    <>
      <Search/>
      <div>
        {allCoins.map(coin => (
            <li key={coin.id}> 
              <label>
              <img src={coin.image} alt={coin.symbol} width="15" height="15" />
              {coin.name} --  {coin.current_price}
              </label>
              <button onClick={()=>{AddToLocalStorage(coin.id)}}>+</button>
              <button>-</button>
            </li>
          ) 
        )}
      </div>
      <hr/>
        <div>
        {userCoinsDATA.map(coin => (
            <li key={coin.id}> 
              <label>
              <img src={coin.image} alt={coin.symbol} width="15" height="15" />
              {coin.name} --  {coin.current_price}
              </label>
              <button onClick={()=>{DelLocalStorage(coin.id)}} >-</button>
            </li>
          ) 
        )}
      </div>
    </>
  );
*/
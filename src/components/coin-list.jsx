import { useState } from 'react';


export function CoinList({ data }){

    console.log(data);

    return(
        <>
        <div>
        {data.map(coin => (
            <li key={coin.id}> 
              <img key={coin.id} src={coin.image} alt={coin.symbol} width="15" height="15" />
              {coin.name} --  {coin.current_price}
            </li>
          ) 
        )}
      </div>
        </>
    )
}
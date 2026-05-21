import { useState } from 'react';
import { Link } from "react-router-dom";




export function CoinList({ data, form, addCoin, removeCoin }){
    return(
      <>
        <div>
          {data.map(coin => (
              <li key={coin.id}> 
                <img src={ form=='add'&& coin.thumb || coin.image } alt={coin.id} width="15" height="15" />
                {<Link to={'/coin/' + coin.id}>{coin.name}</Link>} --  {coin.current_price}
                {form == 'default' && <button onClick={()=>{addCoin(coin.id)}}>+</button>}
                {form == 'user' && <button onClick={()=>{removeCoin(coin.id)}} >-</button>}
                {form == 'add' && <button onClick={()=>{addCoin(coin.id)}}>+++</button>}
              </li>
            ) 
          )}
        </div>
      </>
    )
}
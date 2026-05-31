import { Link } from "react-router-dom";
import { CoinListProps } from './type';

export function CoinList({ data = [], form, addCoin, removeCoin }: CoinListProps){
  return(
    <>
      {data.map(coin => (
        <li key={coin.id}> 
          <img src={ coin.image ?? coin.thumb } alt={coin.id} width="15" height="15" />
          {<Link to={'/coin/' + coin.id}>{coin.name}</Link>} --  {coin.current_price}
          {form === true 
            ? <button onClick={()=>{addCoin(coin)}}>+</button> 
            : <button onClick={()=>{removeCoin(coin)}}>-</button>
          }
        </li>
      ))}
    </>
  )
}  
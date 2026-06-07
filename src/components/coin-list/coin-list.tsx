import { Link } from "react-router-dom";
import { CoinListProps } from './type';
import { useCoinStore } from '../../store/CoinStore'

export function CoinList({ data = [], form }: CoinListProps){
    const addToUserCoins = useCoinStore(store => store.addToUserCoins);
    const removeUserCoin = useCoinStore(stoere => stoere.removeUserCoin);

  return(
    <>
      {data.map(coin => (
        <li key={coin.id}> 
          <img src={ coin.image ?? coin.thumb } alt={coin.id} width="15" height="15" />
          {<Link to={'/coin/' + coin.id}>{coin.name}</Link>} --  {coin.current_price}
          {form === true 
            ? <button onClick={()=>{addToUserCoins(coin)}}>+</button> 
            : <button onClick={()=>{removeUserCoin(coin)}}>-</button>
          }
        </li>
      ))}
    </>
  )
}  
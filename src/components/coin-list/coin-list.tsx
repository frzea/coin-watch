import { Link } from "react-router-dom";
import { CoinListProps } from './type';
import { useCoinStore } from '../../store/CoinStore'

export function CoinList({ data = [], form }: CoinListProps){
    const addToUserCoins = useCoinStore(store => store.addToUserCoins);
    const removeUserCoin = useCoinStore(stoere => stoere.removeUserCoin);

  return(
    <>
      <div className="flex flex-col">
        {data.map(coin => (
          <ul style={{ listStyleType: 'none' }} key={coin.id} >
            <li className="flex border"> 
              <div> 
                <img src={ coin.image ?? coin.thumb } alt={coin.id} width="15" height="15" /> 
              </div>
              <div>
                {<Link to={'/coin/' + coin.id}>{coin.name}</Link>}
              </div>
              <div>
                   {coin.current_price}
              </div>
             
              {form === true 
                ? <button onClick={()=>{addToUserCoins(coin)}}>+</button> 
                : <button onClick={()=>{removeUserCoin(coin)}}>-</button>
              }
            </li>
          </ul>
        ))}
      </div>
    </>
  )
}  
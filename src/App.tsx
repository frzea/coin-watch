import { CoinList } from './components/coin-list/coin-list.tsx'
import { Search } from './components/search/index.tsx'
import { Outlet } from "react-router-dom";
import { useCoinStore } from './store/CoinStore.ts'
import { useCoinSync } from './composable/useCoinSync.ts'
import './index.css'
import { useToggle } from './composable/useToggle.ts'



export default function App(){
  const { toggleValue,toggle } = useToggle(false);
  useCoinSync();
  const {topCoins, userCoins} = useCoinStore();

  console.log(toggleValue);

  return ( 
    <>
      <div data-theme={ toggleValue ? "dark" : "light"}  id="main">
        <div className ="bg-white dark:bg-gray-800" id ="sidebar">
          <button onClick={toggle}>Черный</button>
          <Search />
          <CoinList data={topCoins} form={true} />
          <hr/>
          <CoinList data={userCoins} form={false} />
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
}

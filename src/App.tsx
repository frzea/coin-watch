import { CoinList } from './components/coin-list/coin-list.tsx'
import { Search } from './components/search/index.tsx'
import './index.css'

import { Outlet } from "react-router-dom";
import { useCoinStore } from './store/CoinStore.ts'
import { useCoinSync } from './composable/useCoinSync.ts'


export default function App(){
  useCoinSync();
  const {topCoins, userCoins} = useCoinStore();

  return ( 
    <>
      <div id="main">
        <div id ="sidebar">
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

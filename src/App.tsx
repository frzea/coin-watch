import { CoinList } from './components/coin-list/coin-list.tsx'
import { Search } from './components/search/index.tsx'
import { Outlet } from "react-router-dom";
import { useCoinStore } from './store/CoinStore.ts'
import { useCoinSync } from './composable/useCoinSync.ts'
import './index.css'
import { useDarkMode } from './composable/useDarkMode.ts'



export default function App(){
  const { ChangeMode } = useDarkMode(false);
  useCoinSync();
  const {topCoins, userCoins} = useCoinStore();

  return ( 
    <>
      <div className='bg-white dark:bg-gray-600 text-black dark:text-white'>
        <div>
          <div className='flex justify-between pt-3 px-5'>
            <div>HOLDNote</div>
            <button className='border rounded-lg w-5' onClick={ChangeMode}>*</button>
          </div>
          <Search />
          <div className='px-5 py-3'>
            <div>My coins</div>
            <hr/>
            <CoinList data={topCoins} form={true} />
          </div>
          <hr/>
          <CoinList data={userCoins} form={false} />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

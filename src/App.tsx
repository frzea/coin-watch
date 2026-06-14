import { Search } from './components/search/index.tsx'
import { Outlet, useLocation  } from "react-router-dom";
import { useCoinSync } from './composable/useCoinSync.ts'
import './index.css'
import { TabsCoins } from "@/pages/tabsCoin.tsx"
import { Header } from './components/header/index.tsx';



export default function App(){
  useCoinSync();
  const location = useLocation();

  const isCoinPage = location.pathname.includes("/coin/");


  return ( 
    <>
      <div className='min-h-screen bg-white dark:bg-neutral-900 text-black dark:text-white'>

        {/* Мобильный */}
        <div className="md:hidden">
          {!isCoinPage && (
            <>
              <div className='px-3 flex-row items-center'>
                <Header/>
                <Search />
                <TabsCoins/>
              </div>
            </>
          )}

          <Outlet />
        </div>

        {/* Десктоп */}
        <div className="hidden md:flex">
          <aside className="w-87.5 border-r min-h-screen">
              <div className='px-3 flex-row items-center'>
                <Header/>
                <Search />
                <TabsCoins/>
              </div>
          </aside>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

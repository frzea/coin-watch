import {UserCoinsToolsData } from '../src/components/coin-page/components/coin-tools/types' 

export function migrateLocalStorageToCoinToolsStore() {
   const OLD_KEY = 'userCoinTools' 

   const raw = localStorage.getItem(OLD_KEY)
   if (!raw) return console.log('Нечего мигрировать')

   try {
      const oldData: UserCoinsToolsData = JSON.parse(raw)
      
      const zustandPayload = {
         state: { coinToolsData: oldData },
         version: 0
      }

      localStorage.setItem('CoinToolsData', JSON.stringify(zustandPayload))
      localStorage.removeItem(OLD_KEY)
      
      console.log('Миграция успешна', oldData)
   } catch (e) {
      console.error('Ошибка миграции', e)
   }
}
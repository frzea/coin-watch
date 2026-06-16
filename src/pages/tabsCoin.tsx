import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useCoinStore } from '../store/CoinStore';
import { CoinList } from '../components/coin-list/coin-list.tsx'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export function TabsCoins(){
   const {topCoins, userCoins, purchasedCoins} = useCoinStore();

   return (  
      <Tabs defaultValue="overview">
         <TabsList className='flex items-center justify-center' variant="line">
            <TabsTrigger value="tops">Top`s</TabsTrigger>
            <TabsTrigger value="follow">Follow</TabsTrigger>
            <TabsTrigger value="homemade">Homemade</TabsTrigger>
         </TabsList>
         <TabsContent value="tops">
            <CoinList data={topCoins} form={true} />
         </TabsContent>
         <TabsContent value="follow">
            <CoinList data={userCoins} form={false} />
         </TabsContent>
         <TabsContent value="homemade">
            <ScrollArea className="rounded-md border p-4">
                  <CoinList data={purchasedCoins} form={null} />
            </ScrollArea>
         </TabsContent>
      </Tabs>    
   )
}
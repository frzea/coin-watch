import { PNL } from "./pnl/index"
import { TaskScheduler } from "./todo/index";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"


export function CoinTools(){
   return(
      <Tabs defaultValue="todos">
         <TabsList className='flex items-center justify-center' variant="line">
            <TabsTrigger value="pnl">Transaction history</TabsTrigger>
            <TabsTrigger value="todos">Notes</TabsTrigger>
         </TabsList>
         <TabsContent value="pnl">
            <PNL/>
         </TabsContent>
         <TabsContent value="todos">
            <TaskScheduler/>
         </TabsContent>
      </Tabs>  
   )
}
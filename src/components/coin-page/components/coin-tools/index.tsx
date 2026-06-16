import { PNL } from "./pnl/index"
import { TaskScheduler } from "./todo/index";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"



export function CoinTools(){
   return(
      <Tabs defaultValue="todos" className="flex flex-col flex-1 min-h-0">
         <TabsList className='flex items-center justify-center shrink-0' variant="line">
            <TabsTrigger value="pnl">Transaction history</TabsTrigger>
            <TabsTrigger value="todos">Notes</TabsTrigger>
         </TabsList>
         <TabsContent value="pnl" className="flex flex-1 min-h-0">
            <PNL/>
         </TabsContent>
         <TabsContent value="todos" className="flex  flex-col flex-1 min-h-0">
            <TaskScheduler/>
         </TabsContent>
      </Tabs>  
   )
}
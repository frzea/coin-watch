import{useCoinInfoCalc} from './useCoinInfoCalc'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"


export function CoinInfo(){
   const {capitalization, totalInvested, profitLossPercent,isPositive, pnl, totalQty, avgPrice} = useCoinInfoCalc();

   return (
      <Card className="@container/card mb-5">
         <CardHeader>
            <CardDescription>Capitalization</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
               ${(capitalization ?? 0).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2,})}
            </CardTitle>
            <CardAction>
               <Badge variant="outline" className={`${isPositive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                  {isPositive ? <IconTrendingUp /> : <IconTrendingDown /> } 
                  <span className={`text-xs font-medium px-1 py-1 rounded w-auto flex justify-center `}>
                     {isPositive ? '+' : ''}{Number(profitLossPercent).toFixed(2)}%
                  </span>
               </Badge>
            </CardAction>
         </CardHeader>
         <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className='flex justify-between w-full'>
               <div className="text-muted-foreground">
                  Total Qty
               </div>
               <div className="line-clamp-1 flex gap-2 font-medium">
                  {(totalQty ?? 0).toLocaleString('en-US', {minimumFractionDigits: 0,maximumFractionDigits: 2,})}
               </div>
            </div>
           <div className='flex justify-between w-full'>
               <div className="text-muted-foreground">
                  Total Invested 
               </div>
               <div className="line-clamp-1 flex gap-2 font-medium" >
                  ${(totalInvested ?? 0).toLocaleString('en-US', {minimumFractionDigits: 0,maximumFractionDigits: 2,})}
               </div>
            </div>
           <div className='flex justify-between w-full'>
               <div className="text-muted-foreground">
                  PNL
               </div>  
               <div className="line-clamp-1 flex gap-2 font-medium">
                  ${(pnl ?? 0).toLocaleString('en-US', {minimumFractionDigits: 0,maximumFractionDigits: 2,})}
               </div>            
            </div>
            <div className='flex justify-between w-full'>
               <div className="text-muted-foreground">
                  AVG Pirce
               </div>  
               <div className="line-clamp-1 flex gap-2 font-medium">
                  ${(avgPrice ?? 0).toLocaleString('en-US', {minimumFractionDigits: 0,maximumFractionDigits: 2,})}
               </div>            
            </div>
         </CardFooter>
      </Card>        
   )
}

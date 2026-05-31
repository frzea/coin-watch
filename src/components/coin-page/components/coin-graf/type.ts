
type BinanceCandle = [number, string, string, string, string, string, number, string, number, string, string, string];

type BinanceData = BinanceCandle[]

type GrafProps = {
    data: { date: string; price: number }[]
}

export type {GrafProps, BinanceData}
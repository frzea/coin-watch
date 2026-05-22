

export function CoinInfo({ coinData }){
    const coinbaseTicker =  coinData?.tickers?.find(ticker => ticker.market.name === "Coinbase Exchange");
    return (
        <div id="coinInfo">
            <h4>Последняя цена:  {coinbaseTicker?.last}</h4>
            <h4>Капитализация:  {coinbaseTicker?.coin_mcap_usd}</h4>
            Сылка на witelist: <a href={coinData?.links?.whitepaper}>{coinData?.links?.whitepaper}</a>
            <hr/>
            {coinData?.description?.en}
        </div>
    )
}
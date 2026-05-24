

export function CoinInfo({ coinData }){
    return (
        <div id="coinInfo">
            <h4>Последняя цена:  {coinData.current_price}</h4>
            <h4>Капитализация:  {coinData.fully_diluted_valuation}</h4>
            <h4>Самая высокая цена(24ч):  {coinData.high_24h}</h4>
            <h4>Самая низкая цена(24ч):  {coinData.low_24h}</h4>
            <h4>Общая тенденция цены за 24ч:  {coinData.price_change_percentage_24h}%</h4>
            <h4>Обьем торгов за 24ч:  {coinData.total_volume}</h4>
        </div>
    )
}

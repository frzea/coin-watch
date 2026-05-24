

export function CoinInfo({ coinInfo }){
    return (
        <div id="coinInfo">
            <h4>Последняя цена:  {coinInfo.current_price}</h4>
            <h4>Капитализация:  {coinInfo.fully_diluted_valuation}</h4>
            <h4>Самая высокая цена(24ч):  {coinInfo.high_24h}</h4>
            <h4>Самая низкая цена(24ч):  {coinInfo.low_24h}</h4>
            <h4>Общая тенденция цены за 24ч:  {coinInfo.price_change_percentage_24h}%</h4>
            <h4>Обьем торгов за 24ч:  {coinInfo.total_volume}</h4>
        </div>
    )
}

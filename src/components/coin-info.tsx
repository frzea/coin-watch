import { CoinHeaderProps } from "./types";


export function CoinInfo({ hederData }: CoinHeaderProps){
    return (
        <div id="coinInfo">
            <h4>Последняя цена:  {hederData.current_price}</h4>
            <h4>Капитализация:  {hederData.fully_diluted_valuation}</h4>
            <h4>Самая высокая цена(24ч):  {hederData.high_24h}</h4>
            <h4>Самая низкая цена(24ч):  {hederData.low_24h}</h4>
            <h4>Общая тенденция цены за 24ч:  {hederData.price_change_percentage_24h}%</h4>
            <h4>Обьем торгов за 24ч:  {hederData.total_volume}</h4>
        </div>
    )
}

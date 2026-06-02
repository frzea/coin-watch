import { useCoinStore } from '../../../../../store/CoinStore';


export function CoinInfo(){
    const { selectCoin } = useCoinStore();
    return (
        <div id="coinInfo">
            <h4>Последняя цена:  {selectCoin.current_price}</h4>
            <h4>Капитализация:  {selectCoin.fully_diluted_valuation}</h4>
            <h4>Самая высокая цена(24ч):  {selectCoin.high_24h}</h4>
            <h4>Самая низкая цена(24ч):  {selectCoin.low_24h}</h4>
            <h4>Общая тенденция цены за 24ч:  {selectCoin.price_change_percentage_24h}%</h4>
            <h4>Обьем торгов за 24ч:  {selectCoin.total_volume}</h4>
        </div>
    )
}

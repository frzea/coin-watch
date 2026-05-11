
export async function getCoins(strSearch){

    const response  = await fetch(`https://api.coingecko.com/api/v3/search?query=${strSearch}`);

    const resJSON = await response.json();
    
    return resJSON;

}
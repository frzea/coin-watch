
export async function getCoins(url){
    const response  = await fetch(url);
    const resJSON = await response.json();
    return resJSON;
}
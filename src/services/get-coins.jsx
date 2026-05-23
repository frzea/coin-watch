
export async function getCoins(url){
    const response = await fetch(url);
  
  if (response.status === 429) {
    const err = new Error('rate_limit');
    err.status = 429;
    throw err;
  }
  
  if (!response.ok) {
    throw new Error(`fetch_error: ${response.status}`);
  }
  
  return response.json();  
}


/*
const response  = await fetch(url, options);
    const resJSON = await response.json();
    return resJSON;

*/
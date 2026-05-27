import { useCallback, useState } from "react"

export interface Position {
  id: string
  qty: number | null
  price: number | null
  date: string
}

const EMPTY_POSITION: Position = {id: '',  qty : null, price : null, date : ''}

export function usePNL(){
       const [addPNL, setAddPNL] = useState<boolean>(false);
       //const [newPosition, setNewPosition] = useState<Position>(EMPTY_POSITION);



    const toggelAddPNL = useCallback(()=> setAddPNL(v => !v), []);
    //const updatePositionField = useCallback(()=> );

    return { addPNL, toggelAddPNL }
    
}
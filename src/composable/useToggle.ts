import { useState} from "react"

type UseToggleReturn = {
    toggleValue: boolean
    toggle: () => void
} 

export function useToggle(defaulValues = false): UseToggleReturn{
    const [toggleValue, setToggleValue] = useState<boolean>(defaulValues);    

    const toggle = ()=> setToggleValue(x => !x);

    return {toggleValue, toggle}
}
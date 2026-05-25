import { Dispatch, SetStateAction, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) : [T, Dispatch<SetStateAction<T>>]{
    const [ localStorageValue, setLocalStorageValue] = useState<T>(()=> {
        try{
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : defaultValue;       
        } catch {
            return defaultValue;
        }
    });


    const setValue: Dispatch<SetStateAction<T>> = (newValue) => {
        try{
            if(newValue === null){
                setLocalStorageValue(defaultValue);
                localStorage.removeItem(key);
                return;
            }
            
            const valueToStorage =
                        newValue instanceof Function
                            ? newValue(localStorageValue)
                            : newValue;

            setLocalStorageValue(valueToStorage);
            localStorage.setItem(key,JSON.stringify(valueToStorage));
        } catch(error) {
            console.error(error);
        }
    };

    return [localStorageValue, setValue] as const;
}
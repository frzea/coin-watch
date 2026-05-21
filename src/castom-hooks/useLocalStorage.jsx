import { use, useState } from "react";

export function useLocalStorage(key, defaultValue){
    // Функция внутри useState(() => ...) выполняется только один раз при монтировании.
    const [ localStorageValue, setLocalStorageValue] = useState(()=> {
        try{
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;       // Защита от невалидности json типа: false,0,''
        } catch {
            return defaultValue;
        }
    });

    // Ф-ция обновления и записи в localStorage
    const setValue = (newValue) => {
        try{
            if(newValue === null){
                setLocalStorageValue(defaultValue);
                localStorage.removeItem(key);
                return;
            }

            // Проверка для ф-ции 
            const valueToStorage = (typeof newValue === Function) ? newValue(localStorageValue) : newValue;

            setLocalStorageValue(valueToStorage);
            localStorage.setItem(key,JSON.stringify(valueToStorage));
        } catch(error) {
            console.error(error);
        }
    };

    return [localStorageValue, setValue];
}
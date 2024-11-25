import {useState} from "react";

export const useLocalStorage = (key: string) => {
    const [storageValue, setStorageValue] = useState(() => {
        const response =  localStorage.getItem(key);
        return response ? JSON.parse(response) : null;
    })

    const setLocalStorage = <T,>(value: T) => {
        const response = JSON.stringify(value);
        localStorage.setItem(key, response);
        setStorageValue(response);
    }

    const clearLocalStorage = () => {
        localStorage.clear();
    }
    return {setLocalStorage, clearLocalStorage, storageValue};
}
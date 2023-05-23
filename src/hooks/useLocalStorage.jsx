import { useState } from "react";

/**
 * Stores the ke and initial value to localStorage
 * @param {String} key 
 * @param {Object} initialValue  
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const storeValue = value instanceof Function ? value(storedValue) : value;
      setStoredValue(storeValue);
      window.localStorage.setItem(key, JSON.stringify(storeValue));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

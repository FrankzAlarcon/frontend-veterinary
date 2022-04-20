import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const sessionStogareValue = window.localStorage.getItem(key);
  useEffect(() => {
    if (!sessionStogareValue) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    } else {
      setValue(JSON.parse(sessionStogareValue));
    }
  }, []);
  const setLocalStorageValue = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [
    value,
    setLocalStorageValue,
  ];
}

export default useLocalStorage;

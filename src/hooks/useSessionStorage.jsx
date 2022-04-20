import { useState } from 'react';

function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const sessionStogareValue = window.sessionStorage.getItem(key);
  if (sessionStogareValue) {
    window.sessionStorage.setItem(key, JSON.stringify(initialValue));
  } else {
    setValue(JSON.parse(sessionStogareValue));
  }
  const setSessionStorageValue = (newValue) => {
    setValue(newValue);
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
  };
  return [
    value,
    setSessionStorageValue,
  ];
}

export default useSessionStorage;

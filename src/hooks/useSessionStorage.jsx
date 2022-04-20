import { useState } from 'react';

function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const session = window.sessionStorage.getItem(key);
    if (session) {
      return JSON.parse(session);
    }
    return initialValue;
  });
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

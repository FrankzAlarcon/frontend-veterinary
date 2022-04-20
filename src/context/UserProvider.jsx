import React, { useMemo } from 'react';
import useSessionStorage from '../hooks/useSessionStorage';

export const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useSessionStorage('user', {});

  const values = useMemo(() => ({
    user,
    setUser,
  }), [user]);
  return (
    <UserContext.Provider value={values}>{children}</UserContext.Provider>
  );
}

export default UserProvider;

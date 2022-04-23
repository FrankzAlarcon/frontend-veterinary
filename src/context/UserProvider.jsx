import React, { useMemo, useState } from 'react';
import useSessionStorage from '../hooks/useSessionStorage';

export const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useSessionStorage('user', {});
  const [tasks, setTasks] = useState([]);
  const [refreshPatient, setRefreshPatient] = useState(false);
  const values = useMemo(() => ({
    user,
    tasks,
    setTasks,
    setUser,
    refreshPatient,
    setRefreshPatient,
  }), [user, tasks, refreshPatient]);
  return (
    <UserContext.Provider value={values}>{children}</UserContext.Provider>
  );
}

export default UserProvider;

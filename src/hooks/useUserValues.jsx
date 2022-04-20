import React from 'react';
import { UserContext } from '../context/UserProvider';

function useUserValues() {
  return React.useContext(UserContext);
}

export default useUserValues;

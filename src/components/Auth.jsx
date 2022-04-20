import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserValues from '../hooks/useUserValues';

function Auth({ children }) {
  const navigate = useNavigate();
  const { user } = useUserValues();
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/login');
    }
  }, [user]);
  return children;
}

export default Auth;

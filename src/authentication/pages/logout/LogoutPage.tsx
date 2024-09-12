import { useAuth } from '../../context/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export const LogoutPage = () => {
  async function logout() {
    await auth.logout();
    navigate('/');
  }

  const auth = useAuth();
  const navigate = useNavigate();

  const rOnce = useRef(false);
  if (!rOnce.current) {
    rOnce.current = true;
    logout();
  }

  return <main>Disconnecting...</main>;
};

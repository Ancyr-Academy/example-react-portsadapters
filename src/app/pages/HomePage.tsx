import { useAuth } from '../../authentication/context/AuthProvider.tsx';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const auth = useAuth();
  if (auth.user) {
    return (
      <main>
        Welcome {auth.user.emailAddress}
        <br />
        <Link to={'/logout'}>Sign out</Link>
      </main>
    );
  } else {
    return (
      <main>
        You are not authenticated.
        <br />
        <Link to={'/login'}>Sign in</Link>
      </main>
    );
  }
};

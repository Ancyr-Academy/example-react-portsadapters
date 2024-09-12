import { DependenciesProvider } from './app/dependencies/DependenciesProvider.tsx';
import {
  AuthProvider,
  useAuth,
} from './authentication/context/AuthProvider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './app/pages/HomePage.tsx';
import { LoginPage } from './authentication/pages/login/LoginPage.tsx';
import { LogoutPage } from './authentication/pages/logout/LogoutPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
]);

const Content = () => {
  const auth = useAuth();
  if (!auth.isReady) {
    return null;
  }

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <DependenciesProvider>
      <AuthProvider>
        <Content />
      </AuthProvider>
    </DependenciesProvider>
  );
}

export default App;

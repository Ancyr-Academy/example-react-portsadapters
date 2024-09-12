import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ApiUser } from '../model/api.model.ts';
import { useDependencies } from '../../app/dependencies/DependenciesProvider.tsx';

type Api = {
  user: ApiUser | null;
  isReady: boolean;
  login: (emailAddress: string, password: string) => Promise<ApiUser | null>;
  logout: () => Promise<void>;
};

const Context = createContext<Api>(null as any);

export const AuthProvider = ({ children }: { children: any }) => {
  async function initialize() {
    await authenticator.initialize();
    setReady(true);
  }

  const [user, setUser] = useState<ApiUser | null>(null);
  const [isReady, setReady] = useState(false);

  const { authenticator } = useDependencies();

  // React pattern to ensure code that runs only once
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
    initialize();
  }

  // Synchronize the authenticator service with React
  useEffect(() => {
    return authenticator.user.addListener(setUser);
  }, []);

  const api: Api = {
    user,
    isReady,
    login: (emailAddress: string, password: string) =>
      authenticator.login(emailAddress, password),
    logout: async () => authenticator.logout(),
  };

  return <Context.Provider value={api}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);

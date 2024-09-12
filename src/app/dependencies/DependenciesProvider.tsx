import { createContext, useContext, useMemo } from 'react';
import { Dependencies } from './dependencies.ts';
import { Authenticator } from '../../authentication/authenticator.ts';
import { BrowserStorage } from '../../shared/storage/browser-storage.ts';
import { BrowserAlerter } from '../../shared/alerter/browser-alerter.ts';
import { RamAuthGateway } from '../../authentication/adapters/ram-auth-gateway.ts';

const Context = createContext<Dependencies>(null as any);

export const DependenciesProvider = ({ children }: { children: any }) => {
  const dependencies = useMemo<Dependencies>(() => {
    // Shared
    const storage = new BrowserStorage();
    const alerter = new BrowserAlerter();

    // Gateways
    const authGateway = new RamAuthGateway();

    // Services
    const authenticator = new Authenticator(authGateway, storage, alerter);

    return {
      // Shared
      storage,
      alerter,

      // Gateways
      authGateway,

      // Services
      authenticator,
    };
  }, []);

  return <Context.Provider value={dependencies}>{children}</Context.Provider>;
};

export const useDependencies = () => useContext(Context);

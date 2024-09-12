import { IStorage } from '../../shared/storage/storage.ts';
import { Authenticator } from '../../authentication/authenticator.ts';
import { IAlerter } from '../../shared/alerter/alerter.ts';
import { IAuthGateway } from '../../authentication/ports/auth-gateway.ts';

export type Dependencies = {
  // Shared
  storage: IStorage;
  alerter: IAlerter;

  // Gateways
  authGateway: IAuthGateway;

  // Services
  authenticator: Authenticator;
};

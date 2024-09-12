import { IAuthGateway } from '../../ports/auth-gateway.ts';
import { RamStorage } from '../../../shared/storage/ram-storage.ts';
import { RamAlerter } from '../../../shared/alerter/ram-alerter.ts';
import { Authenticator } from '../../authenticator.ts';
import { DummyAuthGateway } from '../../adapters/dummy-auth-gateway.ts';
import { sampleApiUser } from '../seeds/sample-api-user.ts';

function createSUT({ authGateway }: { authGateway: IAuthGateway }) {
  const storage = new RamStorage();
  const alerter = new RamAlerter();

  const authenticator = new Authenticator(authGateway, storage, alerter);

  return {
    authenticator,
    authGateway,
    alerter,
    storage,
  };
}

describe('the user is not authenticated', () => {
  test('no user should be loaded', async () => {
    const { authenticator } = createSUT({
      authGateway: new DummyAuthGateway(),
    });

    await authenticator.initialize();
    expect(authenticator.user.get()).toBe(null);
  });
});

describe('the user is authenticated', () => {
  test('no user should be loaded', async () => {
    const { authenticator, storage } = createSUT({
      authGateway: new DummyAuthGateway(),
    });

    await storage.set('user', sampleApiUser);

    await authenticator.initialize();
    expect(authenticator.user.get()).toEqual(sampleApiUser);
  });
});

import { Authenticator } from '../../authenticator.ts';
import { ApiUser } from '../../model/api.model.ts';
import { IAuthGateway } from '../../ports/auth-gateway.ts';
import { RamStorage } from '../../../shared/storage/ram-storage.ts';
import { RamAlerter } from '../../../shared/alerter/ram-alerter.ts';
import { DummyAuthGateway } from '../../adapters/dummy-auth-gateway.ts';
import { Optional } from '../../../shared/utils/optional.ts';
import { sampleApiUser } from '../seeds/sample-api-user.ts';

class SimpleAuthGateway extends DummyAuthGateway {
  public refreshToken: string | null = null;

  async login(): Promise<Optional<ApiUser>> {
    return Optional.of(sampleApiUser);
  }

  async logout(refreshToken: string): Promise<void> {
    this.refreshToken = refreshToken;
  }
}

class FailingToLogoutGateway extends DummyAuthGateway {
  async login(): Promise<Optional<ApiUser>> {
    return Optional.of(sampleApiUser);
  }

  async logout(refreshToken: string): Promise<void> {
    throw new Error('Something bad happened');
  }
}

function createSUT({
  authGateway = new DummyAuthGateway(),
}: {
  authGateway: IAuthGateway;
}) {
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

describe('happy path', () => {
  test('calling the logout method with the correct parameters', async () => {
    const authGateway = new SimpleAuthGateway();
    const { authenticator } = createSUT({
      authGateway,
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');
    await authenticator.logout();

    expect(authGateway.refreshToken).toEqual(sampleApiUser.refreshToken.value);
  });

  test('clearing the user', async () => {
    const authGateway = new SimpleAuthGateway();
    const { authenticator } = createSUT({
      authGateway,
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');
    await authenticator.logout();

    expect(authenticator.user.get()).toBe(null);
  });

  test('clearing the storage', async () => {
    const authGateway = new SimpleAuthGateway();
    const { authenticator, storage } = createSUT({
      authGateway,
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');
    await authenticator.logout();

    const storedUser = await storage.get('user');
    expect(storedUser).toBe(null);
  });
});

describe('the gateway fails (for any reason)', () => {
  test('clear the user anyway', async () => {
    const authGateway = new FailingToLogoutGateway();
    const { authenticator } = createSUT({
      authGateway,
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');
    await authenticator.logout();

    expect(authenticator.user.get()).toBe(null);
  });

  test('clear the storage anyway', async () => {
    const authGateway = new FailingToLogoutGateway();
    const { authenticator, storage } = createSUT({
      authGateway,
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');
    await authenticator.logout();

    const storedUser = await storage.get('user');
    expect(storedUser).toBe(null);
  });
});

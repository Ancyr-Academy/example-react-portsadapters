import { Authenticator } from '../../authenticator.ts';
import { ApiUser } from '../../model/api.model.ts';
import { IAuthGateway } from '../../ports/auth-gateway.ts';
import { RamStorage } from '../../../shared/storage/ram-storage.ts';
import { Optional } from '../../../shared/utils/optional.ts';
import { RamAlerter } from '../../../shared/alerter/ram-alerter.ts';
import { DummyAuthGateway } from '../../adapters/dummy-auth-gateway.ts';
import { sampleApiUser } from '../seeds/sample-api-user.ts';

class SpyAuthGateway extends DummyAuthGateway {
  public emailAddress: string | null = null;
  public password: string | null = null;

  async login(
    emailAddress: string,
    password: string,
  ): Promise<Optional<ApiUser>> {
    this.emailAddress = emailAddress;
    this.password = password;

    return Optional.of(sampleApiUser);
  }
}

class RejectingAuthGateway extends DummyAuthGateway {
  async login(): Promise<Optional<ApiUser>> {
    return Optional.of<ApiUser>(null);
  }
}

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

describe('happy path', () => {
  test('calling the gateway with the correct parameters', async () => {
    const authGateway = new SpyAuthGateway();
    const { authenticator } = createSUT({
      authGateway,
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');

    expect(authGateway.emailAddress).toBe('johndoe@gmail.com');
    expect(authGateway.password).toBe('azerty123');
  });

  test('storing the user in the authenticator', async () => {
    const { authenticator } = createSUT({
      authGateway: new SpyAuthGateway(),
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');

    expect(authenticator.user.get()).toEqual(sampleApiUser);
  });

  test('storing the user in long-term storage', async () => {
    const { authenticator, storage } = createSUT({
      authGateway: new SpyAuthGateway(),
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');

    const storedUser = await storage.get('user');
    expect(storedUser).toEqual(sampleApiUser);
  });
});

describe('the credentials are invalid', () => {
  test('the user should not be authenticated', async () => {
    const { authenticator } = createSUT({
      authGateway: new RejectingAuthGateway(),
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');

    expect(authenticator.user.get()).toBeNull();
  });

  test('showing an error message', async () => {
    const { authenticator, alerter } = createSUT({
      authGateway: new RejectingAuthGateway(),
    });

    await authenticator.login('johndoe@gmail.com', 'azerty123');

    expect(alerter.messages).toEqual([
      {
        type: 'error',
        value: 'Invalid email address or password',
      },
    ]);
  });
});

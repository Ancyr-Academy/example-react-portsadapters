import { IAuthGateway } from './ports/auth-gateway.ts';
import { IStorage } from '../shared/storage/storage.ts';
import { Observable } from '../shared/utils/observable.ts';
import { ApiUser } from './model/api.model.ts';
import { IAlerter } from '../shared/alerter/alerter.ts';

export class Authenticator {
  public user = new Observable<ApiUser | null>(null);

  constructor(
    private readonly authGateway: IAuthGateway,
    private readonly storage: IStorage,
    private readonly alerter: IAlerter,
  ) {}

  /**
   * Load the user from the storage if the user is connected
   */
  async initialize() {
    const storedUser = await this.storage.get<ApiUser>('user');
    if (!storedUser) {
      return;
    }

    this.user.set(storedUser);
  }

  /**
   * Sign the user in
   * @param emailAddress
   * @param password
   */
  async login(emailAddress: string, password: string): Promise<ApiUser | null> {
    const result = await this.authGateway.login(emailAddress, password);
    if (result.isNull()) {
      this.alerter.error('Invalid email address or password');
      return null;
    }

    const user = result.get();

    this.user.set(user);
    await this.storage.set('user', user);

    return user;
  }

  /**
   * Sign the user out
   */
  async logout() {
    const user = this.user.get()!;
    if (!user) {
      return;
    }

    try {
      await this.authGateway.logout(user.refreshToken.value);
    } catch (e) {}

    this.user.set(null);
    await this.storage.remove('user');
  }
}

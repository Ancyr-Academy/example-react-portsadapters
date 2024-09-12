import { IAuthGateway } from '../ports/auth-gateway.ts';
import { Optional } from '../../shared/utils/optional.ts';
import { ApiUser } from '../model/api.model.ts';

export class DummyAuthGateway implements IAuthGateway {
  async login(
    emailAddress: string,
    password: string,
  ): Promise<Optional<ApiUser>> {
    return Optional.of<ApiUser>(null);
  }

  async logout(refreshToken: string) {
    return;
  }
}

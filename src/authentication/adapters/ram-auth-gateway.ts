import { IAuthGateway } from '../ports/auth-gateway.ts';
import { Optional } from '../../shared/utils/optional.ts';
import { ApiUser } from '../model/api.model.ts';
import { sampleApiUser } from '../tests/seeds/sample-api-user.ts';
// @ts-ignore
import deepClone from 'deep-clone';

export class RamAuthGateway implements IAuthGateway {
  async login(
    emailAddress: string,
    password: string,
  ): Promise<Optional<ApiUser>> {
    if (emailAddress === sampleApiUser.emailAddress) {
      return Optional.of(deepClone(sampleApiUser));
    }

    return Optional.of<ApiUser>(null);
  }

  async logout() {
    return;
  }
}

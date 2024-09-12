import { ApiUser } from '../model/api.model.ts';
import { Optional } from '../../shared/utils/optional.ts';

export interface IAuthGateway {
  login(emailAddress: string, password: string): Promise<Optional<ApiUser>>;
  logout(refreshToken: string): Promise<void>;
}

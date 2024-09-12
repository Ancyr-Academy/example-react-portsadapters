import { ApiUser } from '../../model/api.model.ts';

export const sampleApiUser: ApiUser = {
  id: '123',
  emailAddress: 'johndoe@gmail.com',
  accessToken: {
    value: '123',
    expiresAt: new Date('2025-02-01T00:00:00.000Z').toISOString(),
  },
  refreshToken: {
    value: '123',
    expiresAt: new Date('2025-02-01T00:00:00.000Z').toISOString(),
  },
};

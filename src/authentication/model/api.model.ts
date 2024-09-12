export type ApiToken = {
  value: string;
  expiresAt: string;
};

export type ApiUser = {
  id: string;
  emailAddress: string;
  accessToken: ApiToken;
  refreshToken: ApiToken;
};

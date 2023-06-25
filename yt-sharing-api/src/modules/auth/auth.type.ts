export type AuthJwtPayload = {
  sub: string;
  id: string;
  iat: number;
  exp: number;
};

export type AuthJwtSignPayload = {
  sub: string;
  id: string;
};

export type FindOneAuthUserConditions = {
  phoneNumber?: string;
};

export type CreateUserPayload = {
  phoneNumber?: string;
};

export type SignInData = {
  accessToken: string;
};

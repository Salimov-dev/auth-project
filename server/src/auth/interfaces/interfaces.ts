import { Role } from '@prisma/client';

export interface IAccessToken {
  userId: string;
  username: string;
  email: string;
  role: Role[];
}

export type JWTPayload = IAccessToken;

import { Role } from '@prisma/client';

/** Shape of the data we encode inside the JWT. */
export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

/** Authenticated user attached to the request after a valid JWT. */
export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}

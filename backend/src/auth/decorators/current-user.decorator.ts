import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../types/jwt-payload.interface';

/** Injects the authenticated user (set by JwtStrategy) into a controller method. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    return request.user;
  },
);

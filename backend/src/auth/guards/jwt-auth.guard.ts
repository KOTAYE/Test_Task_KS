import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Rejects the request unless a valid JWT is provided. */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

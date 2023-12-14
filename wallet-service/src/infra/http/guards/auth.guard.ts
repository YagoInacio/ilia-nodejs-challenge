import { UserService } from '@infra/grpc/services/UserService';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Request } from 'express';
import { join } from 'path';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '..', '..', 'grpc/proto/user.proto'),
    },
  })
  grpcClient: ClientGrpc;
  private userService: UserService;

  constructor(private jwtService: JwtService) {}

  onModuleInit() {
    this.userService = this.grpcClient.getService<UserService>('UserService');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Access token is missing or invalid');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_PRIVATE_KEY,
      });

      request['user'] = payload;

      if (payload.user_id) {
        const user = await firstValueFrom(
          this.userService.findUser({
            id: payload.user_id,
          }),
        );

        request['user'] = user;
      }
    } catch {
      throw new UnauthorizedException('Access token is missing or invalid');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

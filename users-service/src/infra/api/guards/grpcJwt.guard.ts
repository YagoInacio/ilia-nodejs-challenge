import { AppError } from '@errors/appError.exception';
import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GRPCAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const grpcContext = context.switchToRpc().getContext();
    const token = this.extractTokenFromMetadata(grpcContext);

    if (!token) {
      throw new AppError('Access token is missing or invalid', 401);
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_INTERNAL_PRIVATE_KEY,
      });
    } catch {
      throw new AppError('Access token is missing or invalid', 401);
    }
    return true;
  }

  private extractTokenFromMetadata(context): string | undefined {
    const metadata = context.internalRepr.get('authorization');
    if (!metadata) {
      return undefined;
    }
    const [type, token] = metadata[0]?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

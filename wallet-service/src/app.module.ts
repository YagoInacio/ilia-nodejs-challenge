import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { GlobalExceptionFilter } from '@errors/globalException.filter';
import { AuthGuard } from '@infra/http/guards/auth.guard';
import { GrpcModule } from '@infra/grpc/grpc.module';

@Module({
  imports: [
    HttpModule,
    GrpcModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { APIModule } from '@infra/api/api.module';
import { AuthGuard } from '@infra/api/guards/auth.guard';

@Module({
  imports: [APIModule, DatabaseModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

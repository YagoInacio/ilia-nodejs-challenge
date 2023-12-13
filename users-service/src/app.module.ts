import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { AuthGuard } from '@infra/http/guards/auth.guard';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}

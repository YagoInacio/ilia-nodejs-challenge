import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from './infra/database/database.module';
import { GlobalExceptionFilter } from '@errors/globalException.filter';
import { HttpModule } from '@infra/http/http.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

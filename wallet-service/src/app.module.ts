import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@errors/globalException.filter';

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

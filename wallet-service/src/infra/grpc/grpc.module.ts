import { Module } from '@nestjs/common';
import { FindUser } from './services/findUser.service';

@Module({
  providers: [FindUser],
  exports: [FindUser],
})
export class GrpcModule {}

import { Module } from '@nestjs/common';
import { CreateUser } from './useCases/createUser.service';
import { ValidatePassword } from './useCases/validatePassword.service';
import { UsersController } from './infra/http/controllers/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [ValidatePassword, CreateUser],
})
export class UsersModule {}

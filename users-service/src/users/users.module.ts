import { Module } from '@nestjs/common';
import { CreateUser } from './useCases/createUser.service';
import { ValidatePassword } from './useCases/validatePassword.service';
import { UsersController } from './infra/http/controllers/users.controller';
import { ListUsers } from './useCases/listUsers.service';
import { GetUser } from './useCases/getUser.service';
import { UpdateUser } from './useCases/updateUser.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [ValidatePassword, CreateUser, ListUsers, GetUser, UpdateUser],
})
export class UsersModule {}

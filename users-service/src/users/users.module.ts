import { Module } from '@nestjs/common';
import { CreateUser } from './useCases/createUser.service';
import { ValidatePassword } from './useCases/validatePassword.service';
import { UsersController } from './infra/http/controllers/users.controller';
import { ListUsers } from './useCases/listUsers.service';
import { GetUser } from './useCases/getUser.service';
import { UpdateUser } from './useCases/updateUser.service';
import { DeleteUser } from './useCases/deleteUser.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthUser } from './useCases/authUser.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_PRIVATE_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    ValidatePassword,
    CreateUser,
    ListUsers,
    GetUser,
    UpdateUser,
    DeleteUser,
    AuthUser,
  ],
})
export class UsersModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUser } from '@users/useCases/createUser.service';
import { CreateUserBody } from '../dtos/createUserBody';
import {
  UserViewModel,
  UserViewModelSchema,
} from '../viewModels/UserViewModel';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private createUser: CreateUser) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created',
    type: UserViewModelSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  async create(@Body() body: CreateUserBody) {
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    } = body;

    const { user } = await this.createUser.execute({
      firstName,
      lastName,
      email,
      password,
    });

    return UserViewModel.toHTTP(user);
  }
}

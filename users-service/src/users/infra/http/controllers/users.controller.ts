import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUser } from '@users/useCases/createUser.service';
import { CreateUserBody } from '../dtos/createUserBody';
import {
  UserViewModel,
  UserViewModelSchema,
} from '../viewModels/UserViewModel';
import { ListUsers } from '@users/useCases/listUsers.service';
import { GetUser } from '@users/useCases/getUser.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private listUsers: ListUsers,
    private getUser: GetUser,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created',
    type: UserViewModelSchema,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to create: user exists or invalid password',
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

  @Get()
  @ApiOkResponse({
    description: 'OK',
    type: [UserViewModelSchema],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  async list() {
    const { users } = await this.listUsers.execute();

    return users.map(UserViewModel.toHTTP);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    type: UserViewModelSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the user to be returned',
    required: true,
  })
  async find(@Param('id') id: string) {
    const { user } = await this.getUser.execute({ id });

    return UserViewModel.toHTTP(user);
  }
}

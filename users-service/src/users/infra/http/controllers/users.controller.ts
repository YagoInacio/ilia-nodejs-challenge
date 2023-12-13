import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBearerAuth,
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
import { UpdateUserBody } from '../dtos/updateUserBody';
import { UpdateUser } from '@users/useCases/updateUser.service';
import { DeleteUser } from '@users/useCases/deleteUser.service';
import { Public } from '@infra/http/decorators/publicRoute.decorator';
import { GlobalExceptionFilter } from '@errors/globalException.filter';

@Controller('users')
@ApiTags('Users')
@UseFilters(GlobalExceptionFilter)
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private listUsers: ListUsers,
    private getUser: GetUser,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
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
  @Public()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  async find(@Param('id') id: string) {
    const { user } = await this.getUser.execute({ id });

    return UserViewModel.toHTTP(user);
  }

  @Patch(':id')
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
  @ApiResponse({
    status: 400,
    description: 'Could not update: invalid email or password',
  })
  @ApiParam({
    name: 'id',
    description: 'Id of the user to be updated',
    required: true,
  })
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() body: UpdateUserBody) {
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    } = body;

    const { user } = await this.updateUser.execute({
      id,
      firstName,
      lastName,
      email,
      password,
    });

    return UserViewModel.toHTTP(user);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted',
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
    description: 'Id of the user to be deleted',
    required: true,
  })
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    await this.deleteUser.execute({ id });
  }
}

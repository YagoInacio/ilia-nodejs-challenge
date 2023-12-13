import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '@users/useCases/authUser.service';
import { AuthUserBody } from '../dtos/authUserBody';
import {
  AuthUserViewModel,
  AuthUserViewModelSchema,
} from '../viewModels/AuthUserViewModel';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authUser: AuthUser) {}

  @Post()
  @ApiOkResponse({
    description: 'Login succeeded',
    type: AuthUserViewModelSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid email/password',
  })
  @HttpCode(200)
  async auth(@Body() body: AuthUserBody) {
    const {
      user: { email, password },
    } = body;

    const { user, accessToken } = await this.authUser.execute({
      email,
      password,
    });

    return AuthUserViewModel.toHTTP(user, accessToken);
  }
}

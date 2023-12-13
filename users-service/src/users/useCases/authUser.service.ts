import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserInputDTO, AuthUserOutputDTO } from '@users/dtos/authUserDTOs';
import { UsersRepository } from '@users/repositories/usersRepository';
import { AppError } from '@errors/appError.exception';

@Injectable()
export class AuthUser {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute(input: AuthUserInputDTO): Promise<AuthUserOutputDTO> {
    const { email, password } = input;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid email/password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError('Invalid email/password', 401);
    }

    const payload = { sub: user.id, user_id: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user,
      accessToken,
    };
  }
}

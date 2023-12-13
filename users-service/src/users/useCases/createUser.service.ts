import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from '@users/dtos/createUserDTOs';
import { Email } from '@users/entities/email';
import { UsersRepository } from '@users/repositories/usersRepository';
import { ValidatePassword } from './validatePassword.service';
import { AppError } from '@errors/appError.exception';
import { User } from '@users/entities/user';

@Injectable()
export class CreateUser {
  constructor(
    private validatePassword: ValidatePassword,
    private usersRepository: UsersRepository,
  ) {}

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const {
      firstName,
      lastName,
      email: rawEmail,
      password: rawPassword,
    } = input;

    const userExists = await this.usersRepository.findByEmail(rawEmail);

    if (userExists) {
      throw new AppError('User already exists');
    }

    const email = new Email(rawEmail);

    if (!this.validatePassword.execute(rawPassword)) {
      throw new AppError('Invalid password');
    }

    const password = await bcrypt.hash(rawPassword, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    await this.usersRepository.create(user);

    // Normally it would notify the email microservice to send a confirmation email here.

    return { user };
  }
}

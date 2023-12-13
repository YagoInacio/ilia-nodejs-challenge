import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  UpdateUserInputDTO,
  UpdateUserOutputDTO,
} from '@users/dtos/updateUserDTOs';
import { UsersRepository } from '@users/repositories/usersRepository';
import { ValidatePassword } from './validatePassword.service';
import { AppError } from '@errors/appError.exception';
import { Email } from '@users/entities/email';

@Injectable()
export class UpdateUser {
  constructor(
    private validatePassword: ValidatePassword,
    private usersRepository: UsersRepository,
  ) {}

  async execute(input: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
    const { id, firstName, lastName, email, password } = input;

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (email) {
      const alreadyExists = await this.usersRepository.findByEmail(email);

      if (alreadyExists && alreadyExists.id !== id) {
        throw new AppError('Email already registered');
      }

      user.email = new Email(email);
    }
    if (password) {
      if (!this.validatePassword.execute(password)) {
        throw new AppError('Invalid password');
      }

      user.password = await bcrypt.hash(password, 10);
    }

    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;

    await this.usersRepository.save(user);

    return { user };
  }
}

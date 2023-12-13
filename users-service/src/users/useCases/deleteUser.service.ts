import { AppError } from '@errors/appError.exception';
import { Injectable } from '@nestjs/common';
import {
  DeleteUserInputDTO,
  DeleteUserOutputDTO,
} from '@users/dtos/deleteUserDTOs';
import { UsersRepository } from '@users/repositories/usersRepository';

@Injectable()
export class DeleteUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(input: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> {
    const { id } = input;

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.usersRepository.deactivate(id);
  }
}

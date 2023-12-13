import { AppError } from '@errors/appError.exception';
import { Injectable } from '@nestjs/common';
import { GetUserInputDTO, GetUserOutputDTO } from '@users/dtos/getUserDTOs';
import { UsersRepository } from '@users/repositories/usersRepository';

@Injectable()
export class GetUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(input: GetUserInputDTO): Promise<GetUserOutputDTO> {
    const { id } = input;

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return { user };
  }
}

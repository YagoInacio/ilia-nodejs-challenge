import { Injectable } from '@nestjs/common';
import { ListUsersOutputDTO } from '@users/dtos/listUsersDTOs';
import { UsersRepository } from '@users/repositories/usersRepository';

@Injectable()
export class ListUsers {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersOutputDTO> {
    const users = await this.usersRepository.listAll();

    return { users };
  }
}

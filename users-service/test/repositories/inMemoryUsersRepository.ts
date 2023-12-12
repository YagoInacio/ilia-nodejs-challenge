import { User } from '@users/entities/user';
import { UsersRepository } from '@users/repositories/usersRepository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email.value === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async listAll(): Promise<User[]> {
    return this.users;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    }
  }

  async confirm(id: string): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === id);

    if (userIndex >= 0) {
      this.users[userIndex].confirmed = true;
    }
  }

  async deactivate(id: string): Promise<void> {
    const userIndex = this.users.findIndex((item) => item.id === id);

    if (userIndex >= 0) {
      this.users[userIndex].active = false;
    }
  }
}

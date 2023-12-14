import { User } from '@users/entities/user';

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract listAll(): Promise<User[]>;
  abstract create(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;
  abstract confirm(id: string): Promise<void>;
  abstract deactivate(id: string): Promise<void>;
}

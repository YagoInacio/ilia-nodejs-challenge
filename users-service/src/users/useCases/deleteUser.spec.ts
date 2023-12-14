import { InMemoryUsersRepository } from '@test/repositories/inMemoryUsersRepository';
import { DeleteUser } from './deleteUser.service';
import { User } from '@users/entities/user';
import { Email } from '@users/entities/email';
import { ObjectId } from 'bson';
import { AppError } from '@errors/appError.exception';

let usersRepository: InMemoryUsersRepository;
let deleteUser: DeleteUser;

describe('Delete User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    deleteUser = new DeleteUser(usersRepository);
  });

  it('should be able to delete an user', async () => {
    const user = new User({
      firstName: 'Thomas',
      lastName: 'Anderson',
      email: new Email('foo@email.com'),
      password: 'EbYu&lqafV5T',
    });
    usersRepository.users.push(user);

    await deleteUser.execute({ id: user.id });

    const storedUser = await usersRepository.findById(user.id);

    expect(storedUser).toBeTruthy();
    expect(storedUser.active).toBe(false);
  });

  it('should not be able to delete a non existent user', async () => {
    expect(() => {
      return deleteUser.execute({ id: new ObjectId().toHexString() });
    }).rejects.toBeInstanceOf(AppError);
  });
});

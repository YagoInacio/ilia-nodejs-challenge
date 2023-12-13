import { InMemoryUsersRepository } from '@test/repositories/inMemoryUsersRepository';
import { ListUsers } from './listUsers.service';
import { User } from '@users/entities/user';
import { Email } from '@users/entities/email';

describe('List Users', () => {
  it('should be able to list all users', async () => {
    const usersRepo = new InMemoryUsersRepository();
    const listUsers = new ListUsers(usersRepo);

    usersRepo.users.push(
      new User({
        firstName: 'John',
        lastName: 'Wick',
        email: new Email('foo@bar.com'),
        password: 'gibberish',
      }),
    );
    usersRepo.users.push(
      new User({
        firstName: 'Thomas',
        lastName: 'Anderson',
        email: new Email('foo@email.com'),
        password: 'gibberish',
      }),
    );
    usersRepo.users.push(
      new User({
        firstName: 'Jester',
        lastName: 'Lavore',
        email: new Email('jester@email.com'),
        password: 'gibberish',
      }),
    );

    const { users } = await listUsers.execute();

    expect(users).toHaveLength(3);
  });
});

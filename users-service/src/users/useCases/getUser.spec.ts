import { InMemoryUsersRepository } from '@test/repositories/inMemoryUsersRepository';
import { GetUser } from './getUser.service';
import { User } from '@users/entities/user';
import { Email } from '@users/entities/email';
import { AppError } from '@errors/appError.exception';
import { ObjectId } from 'bson';

let usersRepo: InMemoryUsersRepository;
let getUser: GetUser;

describe('Get User', () => {
  beforeEach(() => {
    usersRepo = new InMemoryUsersRepository();
    getUser = new GetUser(usersRepo);
  });

  it('should be able to find a user', async () => {
    const user1 = new User({
      firstName: 'John',
      lastName: 'Wick',
      email: new Email('foo@bar.com'),
      password: 'gibberish',
    });
    usersRepo.users.push(user1);
    usersRepo.users.push(
      new User({
        firstName: 'Thomas',
        lastName: 'Anderson',
        email: new Email('foo@email.com'),
        password: 'gibberish',
      }),
    );

    const { user } = await getUser.execute({
      id: user1.id,
    });

    expect(user).toBeTruthy();
    expect(user.id).toEqual(user1.id);
    expect(user.firstName).toEqual('John');
  });

  it('should not be able to find a non existent user', async () => {
    expect(async () => {
      return getUser.execute({
        id: new ObjectId().toHexString(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

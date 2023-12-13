import { InMemoryUsersRepository } from '@test/repositories/inMemoryUsersRepository';
import { ValidatePassword } from './validatePassword.service';
import { AppError } from '@errors/appError.exception';
import { UpdateUser } from './updateUser.service';
import { User } from '@users/entities/user';
import { Email } from '@users/entities/email';
import { ObjectId } from 'bson';

let validatePassword: ValidatePassword;
let usersRepository: InMemoryUsersRepository;
let updateUser: UpdateUser;
let userId: string;

describe('Update User', () => {
  beforeEach(() => {
    validatePassword = new ValidatePassword();
    usersRepository = new InMemoryUsersRepository();
    updateUser = new UpdateUser(validatePassword, usersRepository);

    const user = new User({
      firstName: 'Thomas',
      lastName: 'Anderson',
      email: new Email('foo@email.com'),
      password: 'EbYu&lqafV5T',
    });
    usersRepository.users.push(user);
    userId = user.id;
  });

  it('should be able to update an user', async () => {
    const password = 'yNLW@Tg3EBg5';

    const { user } = await updateUser.execute({
      id: userId,
      firstName: 'Lex',
      lastName: 'Luthor',
      email: 'lex@luthorcorp.com',
      password,
    });

    expect(user).toBeTruthy();
    expect(user).toHaveProperty('id');
    expect(user.password === password).toBe(false);
  });

  it('should not be able to update a non existent user', async () => {
    expect(async () => {
      return updateUser.execute({
        id: new ObjectId().toHexString(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user with invalid password', async () => {
    const password = 'a'.repeat(12);

    expect(async () => {
      return updateUser.execute({
        id: userId,
        firstName: 'Lex',
        lastName: 'Luthor',
        email: 'lex@luthorcorp.com',
        password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user with existing email from other user', async () => {
    usersRepository.users.push(
      new User({
        firstName: 'Thomas',
        lastName: 'Anderson',
        email: new Email('fool_me_once@email.com'),
        password: 'J@sJdPj0A4#8',
      }),
    );

    expect(async () => {
      return updateUser.execute({
        id: userId,
        firstName: 'Lex',
        lastName: 'Luthor',
        email: 'fool_me_once@email.com',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

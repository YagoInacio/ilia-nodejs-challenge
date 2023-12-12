import { InMemoryUsersRepository } from '@test/repositories/inMemoryUsersRepository';
import { ValidatePassword } from './validatePassword.service';
import { CreateUser } from './createUser.service';
import { AppError } from '@errors/appError.exception';

let validatePassword: ValidatePassword;
let usersRepository: InMemoryUsersRepository;
let createUser: CreateUser;

describe('Create User', () => {
  beforeEach(() => {
    validatePassword = new ValidatePassword();
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(validatePassword, usersRepository);
  });

  it('should be able to create a new user', async () => {
    const password = '1@kD#lwkBG4U';

    const { user } = await createUser.execute({
      firstName: 'Thomas',
      lastName: 'Anderson',
      email: 'foo@bar.com',
      password,
    });

    expect(user).toBeTruthy();
    expect(user).toHaveProperty('id');
    expect(user.password === password).toBe(false);
  });

  it('should not be able to create a user with invalid password', async () => {
    const password = 'a'.repeat(12);

    expect(async () => {
      return createUser.execute({
        firstName: 'Thomas',
        lastName: 'Anderson',
        email: 'foo@bar.com',
        password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

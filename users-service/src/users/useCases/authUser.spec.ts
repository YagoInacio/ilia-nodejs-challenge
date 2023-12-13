import { JwtService } from '@nestjs/jwt';
import { InMemoryUsersRepository } from '@test/repositories/inMemoryUsersRepository';
import { AuthUser } from './authUser.service';
import { CreateUser } from './createUser.service';
import { ValidatePassword } from './validatePassword.service';
import { AppError } from '@errors/appError.exception';

let usersRepository: InMemoryUsersRepository;
let jwtService: JwtService;
let validatePassword: ValidatePassword;
let createUser: CreateUser;
let authUser: AuthUser;

describe('Auth user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    jwtService = new JwtService({
      secret: 'TEST_SECRET',
    });
    validatePassword = new ValidatePassword();
    createUser = new CreateUser(validatePassword, usersRepository);

    authUser = new AuthUser(usersRepository, jwtService);
  });

  it('should be able to authenticate an user', async () => {
    const email = 'foo@bar.com';
    const password = '1@kD#lwkBG4U';

    await createUser.execute({
      firstName: 'Thomas',
      lastName: 'Anderson',
      email,
      password,
    });

    const { user, accessToken } = await authUser.execute({ email, password });

    expect(user).toBeTruthy();
    expect(accessToken).toBeTruthy();
  });

  it('should not be able to authenticate user with wrong email', async () => {
    expect(async () => {
      return authUser.execute({ email: 'foo@bar.com', password: 'password' });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    const email = 'foo@bar.com';
    const password = '1@kD#lwkBG4U';

    await createUser.execute({
      firstName: 'Thomas',
      lastName: 'Anderson',
      email,
      password,
    });

    expect(async () => {
      return authUser.execute({ email, password: 'password' });
    }).rejects.toBeInstanceOf(AppError);
  });
});

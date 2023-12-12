import { Email } from './email';
import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      firstName: 'Thomas',
      lastName: 'Anderson',
      email: new Email('foo@bar.com'),
      password: 'password123',
    });

    expect(user).toBeTruthy();
  });
});

import { ValidatePassword } from './validatePassword.service';

let validatePassword: ValidatePassword;

describe('Password validation', () => {
  beforeEach(() => {
    validatePassword = new ValidatePassword();
  });

  it('should be able to validate a password', () => {
    const isValid = validatePassword.execute('!ljqBazVL7$$');

    expect(isValid).toBe(true);
  });

  it('should not be able to validate a password too short', () => {
    const isValid = validatePassword.execute('a'.repeat(5));

    expect(isValid).toBe(false);
  });

  it('should not be able to validate a password too long', () => {
    const isValid = validatePassword.execute('a'.repeat(25));

    expect(isValid).toBe(false);
  });

  it('should not be able to validate a password without at least one lowercase character', () => {
    const isValid = validatePassword.execute('3*$^8DQCQZJN');

    expect(isValid).toBe(false);
  });

  it('should not be able to validate a password without at least one uppercase character', () => {
    const isValid = validatePassword.execute('gs2#16&53u9o');

    expect(isValid).toBe(false);
  });

  it('should not be able to validate a password without at least one number', () => {
    const isValid = validatePassword.execute('ESBmN^%WvZqc');

    expect(isValid).toBe(false);
  });

  it('should not be able to validate a password without at least one special character', () => {
    const isValid = validatePassword.execute('4A8UD7faYQgq');

    expect(isValid).toBe(false);
  });
});

import { Email } from './email';

describe('Email', () => {
  it('should be able to create an email', () => {
    const email = new Email('test_email@example.com');

    expect(email).toBeTruthy();
  });

  it('should not be able to create an email malformatted', () => {
    expect(() => new Email('test')).toThrow();
    expect(() => new Email('testemail@example')).toThrow();
    expect(() => new Email('@example.com')).toThrow();
    expect(() => new Email('@example')).toThrow();
    expect(() => new Email('@example.')).toThrow();
  });
});

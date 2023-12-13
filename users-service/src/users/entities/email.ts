import { AppError } from '@errors/appError.exception';

export class Email {
  private readonly email: string;

  get value(): string {
    return this.email;
  }

  private validateEmail(email: string): boolean {
    const validEmailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const match = email.match(validEmailRegex);

    if (!match) {
      return false;
    }

    return match.length > 0;
  }

  constructor(email: string) {
    const lowerEmail = email.toLowerCase();

    const isEmailValid = this.validateEmail(lowerEmail);

    if (!isEmailValid) {
      throw new AppError('Email Invalid.');
    }

    this.email = lowerEmail;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatePassword {
  execute(password: string): boolean {
    if (password.length < 8 || password.length > 20) {
      return false;
    }

    // Uppercase
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Lowercase
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Number
    if (!/\d/.test(password)) {
      return false;
    }

    // Special char
    if (!/[!@#$%^&*(),.?":{}|<>_-]/.test(password)) {
      return false;
    }

    return true;
  }
}

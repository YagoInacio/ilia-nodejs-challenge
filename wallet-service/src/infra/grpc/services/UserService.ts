import { Observable } from 'rxjs';

interface FindUserInput {
  id: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: boolean;
}

export interface UserService {
  findUser(data: FindUserInput): Observable<User>;
}

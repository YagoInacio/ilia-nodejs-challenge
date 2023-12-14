import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export interface FindUserInputDTO {
  id: string;
}

export interface FindUserOutputDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: boolean;
}

export interface UserService {
  findUser(
    data: FindUserInputDTO,
    metadata: Metadata,
  ): Observable<FindUserOutputDTO>;
}

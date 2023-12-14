import { GlobalGrpcExceptionFilter } from '@errors/grpcException.filter';
import { Controller, UseFilters, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetUser } from '@users/useCases/getUser.service';
import { FindUserInput } from '../dtos/findOneInput';
import { UserViewModel } from '../viewModels/UserViewModel';
import { GRPCAuthGuard } from '@infra/api/guards/grpcJwt.guard';

@Controller('users')
@UseFilters(GlobalGrpcExceptionFilter)
@UseGuards(GRPCAuthGuard)
export class GrpcUsersController {
  constructor(private getUser: GetUser) {}

  @GrpcMethod('UserService')
  async findUser({ id }: FindUserInput) {
    const { user } = await this.getUser.execute({ id });

    return UserViewModel.toGRPC(user);
  }
}

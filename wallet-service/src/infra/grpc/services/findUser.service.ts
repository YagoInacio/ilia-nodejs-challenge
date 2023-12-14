import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  FindUserInputDTO,
  FindUserOutputDTO,
  UserService,
} from '../dtos/userProtoDTOs';
import { Metadata } from '@grpc/grpc-js';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FindUser implements OnModuleInit {
  constructor(private jwtService: JwtService) {}

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '..', 'proto/user.proto'),
    },
  })
  grpcClient: ClientGrpc;
  private userService: UserService;

  onModuleInit() {
    this.userService = this.grpcClient.getService<UserService>('UserService');
  }

  async execute(input: FindUserInputDTO): Promise<FindUserOutputDTO> {
    const { id } = input;
    const payload = { sub: 'wallet-service' };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_INTERNAL_PRIVATE_KEY,
    });

    const metadata = new Metadata();
    metadata.add('authorization', `Bearer ${accessToken}`);

    const user = await firstValueFrom(
      this.userService.findUser(
        {
          id,
        },
        metadata,
      ),
    );

    return user;
  }
}

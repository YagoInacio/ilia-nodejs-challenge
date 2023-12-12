import { TransactionType } from '@transactions/entities/transaction';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTransactionBody {
  @IsNotEmpty()
  @ApiProperty({
    example: '35763058-1344-4d8c-aebd-eace40083345',
    description: 'Id do usuário',
  })
  user_id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 4700,
    description: 'Valor da transação em centavos',
  })
  amount: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'CREDIT',
    description: 'Id do usuário',
    enum: TransactionType,
  })
  type: TransactionType;
}

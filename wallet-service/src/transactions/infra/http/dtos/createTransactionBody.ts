import { TransactionType } from '@transactions/entities/transaction';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTransactionBody {
  @IsNotEmpty()
  @ApiProperty({
    example: '35763058-1344-4d8c-aebd-eace40083345',
    description: `User's id`,
  })
  user_id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 4700,
    description: 'Transaction value in cents',
  })
  amount: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 'CREDIT',
    description: 'Transaction type',
    enum: TransactionType,
  })
  type: TransactionType;
}

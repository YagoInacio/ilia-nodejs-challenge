import { randomUUID } from 'node:crypto';
import { Replace } from '@helpers/Replace';
import { AppError } from '@errors/appError.exception';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export interface TransactionProps {
  userId: string;
  amount: number;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

export class Transaction {
  private _id: string;
  private props: TransactionProps;

  constructor(
    props: Replace<TransactionProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.validateFields(props);

    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set userId(value: string) {
    this.props.userId = value;
    this.update();
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set amount(value: number) {
    const isValid = this.validateAmount(value);

    if (!isValid) {
      throw new AppError('Amount not valid: must be integer');
    }

    this.props.amount = value;
    this.update();
  }

  public get amount(): number {
    return this.props.amount;
  }

  public set type(value: TransactionType) {
    const isValid = this.validateTransactionType(value);

    if (!isValid) {
      throw new AppError('Transaction type not valid');
    }

    this.props.type = value;
    this.update();
  }

  public get type(): TransactionType {
    return this.props.type;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private update() {
    this.props.updatedAt = new Date();
  }

  private validateTransactionType(type: string): boolean {
    return type === 'CREDIT' || type === 'DEBIT';
  }

  private validateAmount(amount: number): boolean {
    return Number.isInteger(amount);
  }

  private validateFields({
    type,
    amount,
  }: Replace<TransactionProps, { createdAt?: Date; updatedAt?: Date }>) {
    const typeIsValid = this.validateTransactionType(type);

    if (!typeIsValid) {
      throw new AppError('Transaction type not valid');
    }

    const amountIsValid = this.validateAmount(amount);

    if (!amountIsValid) {
      throw new AppError('Amount not valid: must be integer');
    }
  }
}

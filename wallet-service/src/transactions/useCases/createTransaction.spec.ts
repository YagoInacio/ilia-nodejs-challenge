import { InMemoryTransactionsRepository } from '@test/repositories/inMemoryTransactionsRepository';
import { CreateTransaction } from './createTransaction.service';
import { TransactionType } from '../entities/transaction';

describe('Create Transaction', () => {
  it('should be able to create a transaction', async () => {
    const transactionsRepository = new InMemoryTransactionsRepository();
    const createTransaction = new CreateTransaction(transactionsRepository);

    const { transaction } = await createTransaction.execute({
      userId: 'USER_TEST',
      amount: 4500,
      type: TransactionType.CREDIT,
    });

    expect(transaction).toBeTruthy();
    expect(transaction).toHaveProperty('id');
  });
});

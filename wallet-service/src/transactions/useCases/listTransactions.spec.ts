import { InMemoryTransactionsRepository } from '@test/repositories/inMemoryTransactionsRepository';
import { ListTransactions } from './listTransactions.service';
import {
  Transaction,
  TransactionType,
} from '@transactions/entities/transaction';

let transactionsRepository: InMemoryTransactionsRepository;
let listTransactions: ListTransactions;

describe('List Transactions', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    listTransactions = new ListTransactions(transactionsRepository);

    transactionsRepository.transactions.push(
      new Transaction({
        userId: 'USER_TEST_1',
        amount: 10,
        type: TransactionType.CREDIT,
      }),
    );
    transactionsRepository.transactions.push(
      new Transaction({
        userId: 'USER_TEST_1',
        amount: 5,
        type: TransactionType.DEBIT,
      }),
    );
    transactionsRepository.transactions.push(
      new Transaction({
        userId: 'USER_TEST_2',
        amount: 1000,
        type: TransactionType.CREDIT,
      }),
    );
  });

  it("should be able to list all user's transactions", async () => {
    const { transactions } = await listTransactions.execute({
      userId: 'USER_TEST_1',
    });

    expect(transactions).toHaveLength(2);
  });

  it("should be able to list user's transactions filtering by type", async () => {
    const { transactions } = await listTransactions.execute({
      userId: 'USER_TEST_1',
      type: TransactionType.CREDIT,
    });

    expect(transactions).toHaveLength(1);
    expect(transactions[0].type).toEqual(TransactionType.CREDIT);
  });
});

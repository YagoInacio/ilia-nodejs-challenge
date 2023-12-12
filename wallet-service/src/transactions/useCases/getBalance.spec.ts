import { InMemoryTransactionsRepository } from '@test/repositories/inMemoryTransactionsRepository';
import { GetBalance } from './getBalance.service';
import {
  Transaction,
  TransactionType,
} from '@transactions/entities/transaction';

let transactionsRepository: InMemoryTransactionsRepository;
let getBalance: GetBalance;

describe('Get Balance', () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository();
    getBalance = new GetBalance(transactionsRepository);

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

  it('should be able to return balance of all users', async () => {
    const { amount } = await getBalance.execute({});

    expect(amount).toEqual(1005);
  });

  it('should be able to return balance of a single user', async () => {
    const { amount } = await getBalance.execute({
      userId: 'USER_TEST_1',
    });

    expect(amount).toEqual(5);
  });
});

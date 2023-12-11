import { Transaction } from './transaction';

describe('Transaction', () => {
  it('should be able to create a transaction', () => {
    const transaction = new Transaction({
      userId: 'USER_TEST',
      amount: 123,
      type: 'CREDIT',
    });

    expect(transaction).toBeTruthy();
  });

  it('should not be able to create a transaction with invalid type', () => {
    expect(() => {
      new Transaction({
        userId: 'USER_TEST',
        amount: 123,
        type: 'TYPE' as 'CREDIT' | 'DEBIT',
      });
    }).toThrow('Transaction type not valid');
  });

  it('should not be able to create a transaction with invalid amount', () => {
    expect(() => {
      new Transaction({
        userId: 'USER_TEST',
        amount: 12.3,
        type: 'DEBIT',
      });
    }).toThrow('Amount not valid: must be integer');
  });
});

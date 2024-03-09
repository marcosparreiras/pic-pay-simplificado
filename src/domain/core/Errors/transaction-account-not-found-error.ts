export class TransactionAccountNotFoundError extends Error {
  constructor() {
    super("One of the accounts in the transaction was not found");
  }
}

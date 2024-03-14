export class TransactionAuthorizationError extends Error {
  constructor() {
    super("Error in transaction authorization");
  }
}

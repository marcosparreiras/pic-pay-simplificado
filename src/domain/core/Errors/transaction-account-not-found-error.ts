import { DomainError } from "./domain-error";

export class TransactionAccountNotFoundError extends DomainError {
  constructor() {
    super("One of the accounts in the transaction was not found");
  }
}

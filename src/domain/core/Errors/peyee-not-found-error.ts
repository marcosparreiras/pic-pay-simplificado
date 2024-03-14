import { DomainError } from "./domain-error";

export class PayeeNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`Payee of id (${userId}) not found`);
  }
}

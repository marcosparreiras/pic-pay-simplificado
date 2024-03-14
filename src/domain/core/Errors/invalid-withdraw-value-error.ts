import { DomainError } from "./domain-error";

export class InvalidWithdrawValueError extends DomainError {
  constructor(value: number) {
    super(`Can't withdraw value: ${value} - without balance`);
  }
}

import { DomainError } from "./domain-error";

export class InvalidDepositValueError extends DomainError {
  constructor(value: number) {
    super(`Can't deposit value: ${value}`);
  }
}

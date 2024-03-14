import { DomainError } from "./domain-error";

export class EmailAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`Email (${email}) is already in use`);
  }
}

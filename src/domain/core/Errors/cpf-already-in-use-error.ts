import { DomainError } from "./domain-error";

export class CpfAlreadyExistsError extends DomainError {
  constructor(cpf: string) {
    super(`Cpf (${cpf}) is already in use`);
  }
}

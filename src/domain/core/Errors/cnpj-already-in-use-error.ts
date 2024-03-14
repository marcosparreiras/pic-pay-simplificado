import { DomainError } from "./domain-error";

export class CnpjAlreadyExistsError extends DomainError {
  constructor(cnpj: string) {
    super(`Cnpj (${cnpj}) is already in use`);
  }
}

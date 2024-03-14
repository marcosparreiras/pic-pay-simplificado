import { DomainError } from "./domain-error";

export class NaturalPersonNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Natural person of id (${id}) not found`);
  }
}

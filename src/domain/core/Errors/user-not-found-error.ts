import { DomainError } from "./domain-error";

export class UserNotFoundError extends DomainError {
  constructor(userId: string) {
    super(`User of id (${userId}) not found`);
  }
}

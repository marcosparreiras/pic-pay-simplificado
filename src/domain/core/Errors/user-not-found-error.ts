export class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User of id (${userId}) not found`);
  }
}

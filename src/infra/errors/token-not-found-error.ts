export class TokenNotFoundError extends Error {
  constructor() {
    super("Token not found");
  }
}

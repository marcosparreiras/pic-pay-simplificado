export class UnauthorizedActionError extends Error {
  constructor() {
    super("Unauthorized action");
  }
}

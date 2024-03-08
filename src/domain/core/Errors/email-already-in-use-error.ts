export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`Email (${email}) is already in use`);
  }
}

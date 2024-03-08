export class InvalidWithdrawValueError extends Error {
  constructor(value: number) {
    super(`Can't withdraw value: ${value}`);
  }
}

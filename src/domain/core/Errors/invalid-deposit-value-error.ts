export class InvalidDepositValueError extends Error {
  constructor(value: number) {
    super(`Can't deposit value: ${value}`);
  }
}

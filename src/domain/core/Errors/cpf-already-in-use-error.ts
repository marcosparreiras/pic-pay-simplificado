export class CpfAlreadyExistsError extends Error {
  constructor(cpf: string) {
    super(`Cpf (${cpf}) is already in use`);
  }
}

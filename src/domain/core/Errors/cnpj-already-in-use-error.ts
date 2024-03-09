export class CnpjAlreadyExistsError extends Error {
  constructor(cnpj: string) {
    super(`Cnpj (${cnpj}) is already in use`);
  }
}

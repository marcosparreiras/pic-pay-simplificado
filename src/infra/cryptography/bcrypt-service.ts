import { HashCompare } from "../../domain/bank/application/cryptography/hash-compare";
import { HashGenerator } from "../../domain/bank/application/cryptography/hash-generator";
import { hash, compare } from "bcryptjs";

export class BcryptService implements HashGenerator, HashCompare {
  async compare(plain: string, hash: string): Promise<boolean> {
    const isValid = await compare(plain, hash);
    return isValid;
  }

  async hash(plain: string): Promise<string> {
    const hashed = await hash(plain, 8);
    return hashed;
  }
}

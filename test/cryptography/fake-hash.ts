import { HashCompare } from "../../src/domain/bank/application/cryptography/hash-compare";
import { HashGenerator } from "../../src/domain/bank/application/cryptography/hash-generator";

export class FakeHash implements HashGenerator, HashCompare {
  private fakeHash: string = "-hashed";

  async hash(plain: string): Promise<string> {
    return plain + this.fakeHash;
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain + this.fakeHash === hash;
  }
}

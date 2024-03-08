import { AccountRepository } from "../../src/domain/bank/application/repositories/account-repository";
import { Account } from "../../src/domain/bank/enterprise/entities/account";

export class InMemoryAccountRepository implements AccountRepository {
  public items: Account[] = [];

  async create(account: Account): Promise<void> {
    this.items.push(account);
  }
}

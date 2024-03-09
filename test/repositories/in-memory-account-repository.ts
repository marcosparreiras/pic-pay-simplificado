import { AccountRepository } from "../../src/domain/bank/application/repositories/account-repository";
import { Account } from "../../src/domain/bank/enterprise/entities/account";

export class InMemoryAccountRepository implements AccountRepository {
  public items: Account[] = [];

  private save(account: Account): void {
    const index = this.items.findIndex((item) => item.id.isEqual(account.id));
    this.items[index] = account;
  }

  async findById(id: string): Promise<Account | null> {
    const account = this.items.find((item) => item.id.toString() === id);
    return account ?? null;
  }

  async bankTransaction(
    payerAccount: Account,
    payeeAccount: Account
  ): Promise<void> {
    this.save(payerAccount);
    this.save(payeeAccount);
  }

  async create(account: Account): Promise<void> {
    this.items.push(account);
  }
}

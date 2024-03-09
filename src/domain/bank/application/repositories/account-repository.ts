import { Account } from "../../enterprise/entities/account";

export interface AccountRepository {
  create(account: Account): Promise<void>;
  findById(id: string): Promise<Account | null>;
  bankTransaction(payerAccount: Account, payeeAccount: Account): Promise<void>;
}

import { Account } from "../../enterprise/entities/account";

export interface AccountRepository {
  create(account: Account): Promise<void>;
}

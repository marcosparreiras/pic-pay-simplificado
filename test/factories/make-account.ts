import {
  Account,
  AccountProps,
} from "../../src/domain/bank/enterprise/entities/account";
import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";

export function makeAccount(
  overide: Partial<AccountProps> = {},
  id?: UniqueEntityId
) {
  return Account.create(
    {
      balance: 0,
      ...overide,
    },
    id
  );
}

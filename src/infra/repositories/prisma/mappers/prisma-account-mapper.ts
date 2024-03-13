import { Account as PrismaAccount } from "@prisma/client";
import { Account } from "../../../../domain/bank/enterprise/entities/account";
import { UniqueEntityId } from "../../../../domain/core/entities/unique-entity-id";

export class PrismaAccountMapper {
  static toDomain(data: PrismaAccount): Account {
    return Account.create(
      {
        balance: data.balance,
      },
      new UniqueEntityId(data.id)
    );
  }

  static toPrisma(data: Account): PrismaAccount {
    return {
      id: data.id.toString(),
      balance: data.balance,
    };
  }
}

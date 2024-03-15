import { AccountProps } from "../../../src/domain/bank/enterprise/entities/account";
import { UniqueEntityId } from "../../../src/domain/core/entities/unique-entity-id";
import { PrismaAccountMapper } from "../../../src/infra/repositories/prisma/mappers/prisma-account-mapper";
import { prisma } from "../../../src/infra/repositories/prisma/prisma-service";
import { makeAccount } from "../make-account";

export async function makePrismaAccount(
  overide: Partial<AccountProps> = {},
  id?: UniqueEntityId
) {
  const account = makeAccount(overide, id);
  const data = PrismaAccountMapper.toPrisma(account);
  await prisma.account.create({ data });
  return account;
}

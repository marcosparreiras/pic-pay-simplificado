import { AccountRepository } from "../../../domain/bank/application/repositories/account-repository";
import { Account } from "../../../domain/bank/enterprise/entities/account";
import { PrismaAccountMapper } from "./mappers/prisma-account-mapper";
import { prisma } from "./prisma-service";

export class PrismaAccountRepository implements AccountRepository {
  async findById(id: string): Promise<Account | null> {
    const data = await prisma.account.findUnique({ where: { id } });
    if (!data) {
      return null;
    }
    return PrismaAccountMapper.toDomain(data);
  }

  async create(account: Account): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account);
    await prisma.account.create({ data });
  }

  async bankTransaction(
    payerAccount: Account,
    payeeAccount: Account
  ): Promise<void> {
    const payer = PrismaAccountMapper.toPrisma(payerAccount);
    const payee = PrismaAccountMapper.toPrisma(payeeAccount);
    await prisma.$transaction(async (tx) => {
      await tx.account.update({ data: payer, where: { id: payer.id } });
      await tx.account.update({ data: payee, where: { id: payee.id } });
    });
  }
}

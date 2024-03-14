import { BankTransactionUseCase } from "../../domain/bank/application/use-cases/bank-transaction";
import { PrismaAccountRepository } from "../repositories/prisma/prisma-account-repository";
import { PrismaNaturalPersonRepository } from "../repositories/prisma/prisma-natural-person-repository";
import { PrismaShopkeeperRepository } from "../repositories/prisma/prisma-shopkeeper-repository";

export function makeBankTransaction() {
  const naturalPersonRepository = new PrismaNaturalPersonRepository();
  const shopkeeperRepository = new PrismaShopkeeperRepository();
  const accountRepository = new PrismaAccountRepository();
  const useCase = new BankTransactionUseCase(
    naturalPersonRepository,
    shopkeeperRepository,
    accountRepository
  );
  return useCase;
}

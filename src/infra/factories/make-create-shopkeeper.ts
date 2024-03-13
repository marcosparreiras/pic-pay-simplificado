import { CreateShopkeeperUseCase } from "../../domain/bank/application/use-cases/create-shopkeeper";
import { BcryptService } from "../cryptography/bcrypt-service";
import { PrismaAccountRepository } from "../repositories/prisma/prisma-account-repository";
import { PrismaNaturalPersonRepository } from "../repositories/prisma/prisma-natural-person-repository";
import { PrismaShopkeeperRepository } from "../repositories/prisma/prisma-shopkeeper-repository";

export function makeShopkeeperUseCase() {
  const naturalPersonRepository = new PrismaNaturalPersonRepository();
  const shopkeeperRepository = new PrismaShopkeeperRepository();
  const accountRepository = new PrismaAccountRepository();
  const hashGenerator = new BcryptService();
  const useCase = new CreateShopkeeperUseCase(
    naturalPersonRepository,
    shopkeeperRepository,
    accountRepository,
    hashGenerator
  );
  return useCase;
}

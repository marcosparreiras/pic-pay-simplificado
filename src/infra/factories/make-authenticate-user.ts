import { AuthenticateUserUseCase } from "../../domain/bank/application/use-cases/authenticate-user";
import { BcryptService } from "../cryptography/bcrypt-service";
import { PrismaNaturalPersonRepository } from "../repositories/prisma/prisma-natural-person-repository";
import { PrismaShopkeeperRepository } from "../repositories/prisma/prisma-shopkeeper-repository";

export function makeAuthenticateUserUseCase() {
  const naturalPersonRepository = new PrismaNaturalPersonRepository();
  const shopkeeperRepository = new PrismaShopkeeperRepository();
  const hashGenerator = new BcryptService();
  const useCase = new AuthenticateUserUseCase(
    naturalPersonRepository,
    shopkeeperRepository,
    hashGenerator
  );
  return useCase;
}

import { CnpjAlreadyExistsError } from "../../../core/Errors/cnpj-already-in-use-error";
import { EmailAlreadyExistsError } from "../../../core/Errors/email-already-in-use-error";
import { Account } from "../../enterprise/entities/account";
import { Shopkeeper } from "../../enterprise/entities/shopkeeper";
import { HashGenerator } from "../cryptography/hash-generator";
import { AccountRepository } from "../repositories/account-repository";
import { NaturalPersonRepository } from "../repositories/natural-person-repository";
import { shopkeeperRepository } from "../repositories/shopkeeper-repository";

interface CreateShopkeeperUseCaseRequest {
  shopName: string;
  cnpj: string;
  email: string;
  password: string;
}

interface CreateShopkeeperUseCaseResponse {
  shopkeeper: Shopkeeper;
}

export class CreateShopkeeperUseCase {
  constructor(
    private naturalPersonRepository: NaturalPersonRepository,
    private shopkeeperRepository: shopkeeperRepository,
    private accountRepository: AccountRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    shopName,
    email,
    cnpj,
    password,
  }: CreateShopkeeperUseCaseRequest): Promise<CreateShopkeeperUseCaseResponse> {
    const emailAlreadyExists = await Promise.all([
      this.naturalPersonRepository.findByEmail(email),
      this.shopkeeperRepository.findByEmail(email),
    ]);
    if (emailAlreadyExists.some((result) => result !== null)) {
      throw new EmailAlreadyExistsError(email);
    }

    const cnpjAlreadyExists = await this.shopkeeperRepository.findByCnpj(cnpj);
    if (cnpjAlreadyExists) {
      throw new CnpjAlreadyExistsError(cnpj);
    }

    const account = Account.create();
    const hashedPassword = await this.hashGenerator.hash(password);
    const shopkeeper = Shopkeeper.create({
      cnpj,
      shopName,
      email,
      accountId: account.id,
      password: hashedPassword,
    });

    await Promise.all([
      this.accountRepository.create(account),
      this.shopkeeperRepository.create(shopkeeper),
    ]);

    return { shopkeeper };
  }
}

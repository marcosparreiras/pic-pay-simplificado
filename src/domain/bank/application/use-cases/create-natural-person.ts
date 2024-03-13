import { CpfAlreadyExistsError } from "../../../core/Errors/cpf-already-in-use-error";
import { EmailAlreadyExistsError } from "../../../core/Errors/email-already-in-use-error";
import { Account } from "../../enterprise/entities/account";
import { NaturalPerson } from "../../enterprise/entities/natural-person";
import { HashGenerator } from "../cryptography/hash-generator";
import { AccountRepository } from "../repositories/account-repository";
import { NaturalPersonRepository } from "../repositories/natural-person-repository";
import { ShopkeeperRepository } from "../repositories/shopkeeper-repository";

interface CreateNaturalPersonUseCaseRequest {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
}

interface CreateNaturalPersonUseCaseReponse {
  naturalPerson: NaturalPerson;
}

export class CreateNaturalPersonUseCase {
  constructor(
    private naturalPersonRepository: NaturalPersonRepository,
    private shopkeeperRepository: ShopkeeperRepository,
    private accountRepository: AccountRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    fullName,
    cpf,
    email,
    password,
  }: CreateNaturalPersonUseCaseRequest): Promise<CreateNaturalPersonUseCaseReponse> {
    const emailAlredyExists = await Promise.all([
      this.naturalPersonRepository.findByEmail(email),
      this.shopkeeperRepository.findByEmail(email),
    ]);
    if (emailAlredyExists.some((result) => result !== null)) {
      throw new EmailAlreadyExistsError(email);
    }

    const cpfAlreadyExists = await this.naturalPersonRepository.findByCpf(cpf);
    if (cpfAlreadyExists) {
      throw new CpfAlreadyExistsError(cpf);
    }

    const account = Account.create();
    const hashedPassword = await this.hashGenerator.hash(password);
    const naturalPerson = NaturalPerson.create({
      cpf,
      email,
      fullName,
      accountId: account.id,
      password: hashedPassword,
    });

    await this.accountRepository.create(account);
    await this.naturalPersonRepository.create(naturalPerson);

    return { naturalPerson };
  }
}

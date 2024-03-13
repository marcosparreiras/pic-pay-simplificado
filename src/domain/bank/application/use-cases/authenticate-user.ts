import { InvalidCredentialsError } from "../../../core/Errors/invalid-credentials-error";
import { NaturalPerson } from "../../enterprise/entities/natural-person";
import { Shopkeeper } from "../../enterprise/entities/shopkeeper";
import { HashCompare } from "../cryptography/hash-compare";
import { NaturalPersonRepository } from "../repositories/natural-person-repository";
import { ShopkeeperRepository } from "../repositories/shopkeeper-repository";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUserUseCaseResponse {
  user: NaturalPerson | Shopkeeper;
}

export class AuthenticateUserUseCase {
  constructor(
    private naturalPersonRepository: NaturalPersonRepository,
    private shopkeeperRepository: ShopkeeperRepository,
    private hashCompare: HashCompare
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const userArray = await Promise.all([
      this.naturalPersonRepository.findByEmail(email),
      this.shopkeeperRepository.findByEmail(email),
    ]);

    const user = userArray.find((user) => user !== null);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordIsValid = await this.hashCompare.compare(
      password,
      user.password
    );
    if (!passwordIsValid) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}

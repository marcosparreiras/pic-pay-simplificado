import { FakeHash } from "../../../../../test/cryptography/fake-hash";
import { makeNaturalPerson } from "../../../../../test/factories/make-natural-person";
import { makeShopkeeper } from "../../../../../test/factories/make-shopkeeper";
import { InMemoryNaturalPersonRepository } from "../../../../../test/repositories/in-memory-natural-person-repository";
import { InMemoryShopKeeperRepository } from "../../../../../test/repositories/in-memory-shopkeeper-repository";
import { InvalidCredentialsError } from "../../../core/Errors/invalid-credentials-error";
import { AuthenticateUserUseCase } from "./authenticate-user";

describe("AuthenticateUserUseCase [Use-Case]", () => {
  let naturalPersonRepository: InMemoryNaturalPersonRepository;
  let shopkeeperRepository: InMemoryShopKeeperRepository;
  let fakeHash: FakeHash;
  let sut: AuthenticateUserUseCase;

  beforeEach(() => {
    naturalPersonRepository = new InMemoryNaturalPersonRepository();
    shopkeeperRepository = new InMemoryShopKeeperRepository();
    fakeHash = new FakeHash();
    sut = new AuthenticateUserUseCase(
      naturalPersonRepository,
      shopkeeperRepository,
      fakeHash
    );
  });

  it("Should be ale to authenticate a user (natural-person)", async () => {
    const password = "123456";
    const naturalPerson = makeNaturalPerson({
      password: await fakeHash.hash(password),
    });
    naturalPersonRepository.items.push(naturalPerson);
    const result = await sut.execute({ email: naturalPerson.email, password });
    expect(result.user.id).toBeTruthy();
  });

  it("Should be ale to authenticate a user (shopkeeper)", async () => {
    const password = "123456";
    const shopkeeper = makeShopkeeper({
      password: await fakeHash.hash(password),
    });
    shopkeeperRepository.items.push(shopkeeper);
    const result = await sut.execute({ email: shopkeeper.email, password });
    expect(result.user.id).toBeTruthy();
  });

  it("Should not be ale to authenticate a valid user with incorrect password", async () => {
    const shopkeeper = makeShopkeeper({
      password: await fakeHash.hash("123456"),
    });
    shopkeeperRepository.items.push(shopkeeper);

    await expect(() =>
      sut.execute({ email: shopkeeper.email, password: "654321" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be ale to authenticate a invalid user", async () => {
    const password = "123456";
    const email = "johndoe@example.com";

    await expect(() => sut.execute({ email, password })).rejects.toBeInstanceOf(
      InvalidCredentialsError
    );
  });
});

import { FakeHash } from "../../../../../test/cryptography/fake-hash";
import { makeNaturalPerson } from "../../../../../test/factories/make-natural-person";
import { makeShopkeeper } from "../../../../../test/factories/make-shopkeeper";
import { InMemoryAccountRepository } from "../../../../../test/repositories/in-memory-account-repository";
import { InMemoryNaturalPersonRepository } from "../../../../../test/repositories/in-memory-natural-person-repository";
import { InMemoryShopKeeperRepository } from "../../../../../test/repositories/in-memory-shopkeeper-repository";
import { CnpjAlreadyExistsError } from "../../../core/Errors/cnpj-already-in-use-error";
import { EmailAlreadyExistsError } from "../../../core/Errors/email-already-in-use-error";
import { CreateShopkeeperUseCase } from "./create-shopkeeper";

describe("CreateShopkeeperUseCase [Use-Case]", () => {
  let naturalPersonRepository: InMemoryNaturalPersonRepository;
  let shopkeeperRepository: InMemoryShopKeeperRepository;
  let accountRepository: InMemoryAccountRepository;
  let fakeHash: FakeHash;
  let sut: CreateShopkeeperUseCase;

  beforeEach(() => {
    naturalPersonRepository = new InMemoryNaturalPersonRepository();
    shopkeeperRepository = new InMemoryShopKeeperRepository();
    accountRepository = new InMemoryAccountRepository();
    fakeHash = new FakeHash();

    sut = new CreateShopkeeperUseCase(
      naturalPersonRepository,
      shopkeeperRepository,
      accountRepository,
      fakeHash
    );
  });

  it("Should be able to create a shopkeeper and it's account", async () => {
    const { shopkeeper } = await sut.execute({
      shopName: "Doe Shop",
      cnpj: "00235541689954",
      email: "doeshop@example.com",
      password: "123456",
    });

    expect(shopkeeper.id).toBeTruthy();
    expect(shopkeeper).toEqual(
      expect.objectContaining({
        shopName: "Doe Shop",
        cnpj: "00235541689954",
        email: "doeshop@example.com",
      })
    );

    const shopkeeperOnRepository = shopkeeperRepository.items.find((item) =>
      item.id.isEqual(shopkeeper.id)
    );
    expect(shopkeeperOnRepository?.id).toBeTruthy();

    const accountOnRepository = accountRepository.items.find((item) =>
      item.id.isEqual(shopkeeper.accountId)
    );
    expect(accountOnRepository?.id).toBeTruthy();
    expect(accountOnRepository?.balance).toEqual(0);
  });

  it("Should be able to store the password hash", async () => {
    const password = "123456";
    const { shopkeeper } = await sut.execute({
      password,
      shopName: "Doe Shop",
      cnpj: "00235541689954",
      email: "doeshop@example.com",
    });

    const passwordIsHashed = await fakeHash.compare(
      password,
      shopkeeper.password
    );

    expect(passwordIsHashed).toEqual(true);
  });

  it("Should not be able to have duplicate email on system", async () => {
    const email = "some-email@example.com";
    const naturalPerson = makeNaturalPerson({ email });
    naturalPersonRepository.items.push(naturalPerson);
    await expect(() =>
      sut.execute({
        email,
        shopName: "Doe Shop",
        cnpj: "00235541689954",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);

    naturalPersonRepository.items = [];
    const shopkeeper = makeShopkeeper({ email });
    shopkeeperRepository.items.push(shopkeeper);

    await expect(() =>
      sut.execute({
        email,
        shopName: "Doe Shop",
        cnpj: "00235541689954",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("Should not be able to have duplicate cnpj on system", async () => {
    const cnpj = "00235541689954";
    const shopkeeper = makeShopkeeper({ cnpj });
    shopkeeperRepository.items.push(shopkeeper);
    await expect(() =>
      sut.execute({
        cnpj,
        shopName: "Doe Shop",
        email: "doeshop@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(CnpjAlreadyExistsError);
  });
});

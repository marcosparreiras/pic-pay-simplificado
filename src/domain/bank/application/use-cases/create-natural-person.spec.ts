import { FakeHash } from "../../../../../test/cryptography/fake-hash";
import { makeNaturalPerson } from "../../../../../test/factories/make-natural-person";
import { makeShopkeeper } from "../../../../../test/factories/make-shopkeeper";
import { InMemoryAccountRepository } from "../../../../../test/repositories/in-memory-account-repository";
import { InMemoryNaturalPersonRepository } from "../../../../../test/repositories/in-memory-natural-person-repository";
import { InMemoryShopKeeperRepository } from "../../../../../test/repositories/in-memory-shopkeeper-repository";
import { CpfAlreadyExistsError } from "../../../core/Errors/cpf-already-in-use-error";
import { EmailAlreadyExistsError } from "../../../core/Errors/email-already-in-use-error";
import { CreateNaturalPersonUseCase } from "./create-natural-person";

describe("CreateNaturalPersonUseCase [Use-Case]", () => {
  let naturalPersonRepository: InMemoryNaturalPersonRepository;
  let shopkeeperRepository: InMemoryShopKeeperRepository;
  let accountRepository: InMemoryAccountRepository;
  let fakeHash: FakeHash;
  let sut: CreateNaturalPersonUseCase;

  beforeEach(() => {
    naturalPersonRepository = new InMemoryNaturalPersonRepository();
    shopkeeperRepository = new InMemoryShopKeeperRepository();
    accountRepository = new InMemoryAccountRepository();
    fakeHash = new FakeHash();

    sut = new CreateNaturalPersonUseCase(
      naturalPersonRepository,
      shopkeeperRepository,
      accountRepository,
      fakeHash
    );
  });

  it("Should be able to create a new natural person and it's account", async () => {
    const { naturalPerson } = await sut.execute({
      fullName: "John Doe",
      cpf: "00336407259",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(naturalPerson.id).toBeTruthy();
    expect(naturalPerson).toEqual(
      expect.objectContaining({
        fullName: "John Doe",
        cpf: "00336407259",
        email: "johndoe@example.com",
      })
    );

    const naturalPersonOnRepository = naturalPersonRepository.items.find(
      (item) => item.id.isEqual(naturalPerson.id)
    );
    expect(naturalPersonOnRepository?.id).toBeTruthy();

    const accountOnRepository = accountRepository.items.find((item) =>
      item.id.isEqual(naturalPerson.accountId)
    );
    expect(accountOnRepository?.id).toBeTruthy();
    expect(accountOnRepository?.balance).toEqual(0);
  });

  it("Should be able to store the password hash", async () => {
    const password = "123456";
    const { naturalPerson } = await sut.execute({
      password,
      fullName: "John Doe",
      cpf: "00336407259",
      email: "johndoe@example.com",
    });

    const passwordIsHashed = await fakeHash.compare(
      password,
      naturalPerson.password
    );

    expect(passwordIsHashed).toEqual(true);
  });

  it("Should not be able to have duplicate email on system", async () => {
    const email = "some-email@example.com";
    const shopkeeper = makeShopkeeper({ email });
    shopkeeperRepository.items.push(shopkeeper);
    await expect(() =>
      sut.execute({
        email,
        cpf: "00336407259",
        fullName: "John Doe",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);

    shopkeeperRepository.items = [];
    const naturalPerson = makeNaturalPerson({ email });
    naturalPersonRepository.items.push(naturalPerson);

    await expect(() =>
      sut.execute({
        email,
        cpf: "00336407259",
        fullName: "John Doe",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });

  it("Should not be able to have duplicate cpf on system", async () => {
    const cpf = "00336407259";
    const naturalPerson = makeNaturalPerson({ cpf });
    naturalPersonRepository.items.push(naturalPerson);
    await expect(() =>
      sut.execute({
        cpf,
        fullName: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(CpfAlreadyExistsError);
  });
});

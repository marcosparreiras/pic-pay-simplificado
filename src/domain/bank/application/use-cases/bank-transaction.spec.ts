import { makeAccount } from "../../../../../test/factories/make-account";
import { makeNaturalPerson } from "../../../../../test/factories/make-natural-person";
import { makeShopkeeper } from "../../../../../test/factories/make-shopkeeper";
import { InMemoryAccountRepository } from "../../../../../test/repositories/in-memory-account-repository";
import { InMemoryNaturalPersonRepository } from "../../../../../test/repositories/in-memory-natural-person-repository";
import { InMemoryShopKeeperRepository } from "../../../../../test/repositories/in-memory-shopkeeper-repository";
import { NaturalPersonNotFoundError } from "../../../core/Errors/natural-person-not-found-error";
import { BankTransactionUseCase } from "./bank-transaction";

describe("BankTransactionUseCase [Use-Case]", () => {
  let naturalPersonRepository: InMemoryNaturalPersonRepository;
  let shopkeeperRepository: InMemoryShopKeeperRepository;
  let accountRepository: InMemoryAccountRepository;
  let sut: BankTransactionUseCase;

  beforeEach(() => {
    naturalPersonRepository = new InMemoryNaturalPersonRepository();
    shopkeeperRepository = new InMemoryShopKeeperRepository();
    accountRepository = new InMemoryAccountRepository();
    sut = new BankTransactionUseCase(
      naturalPersonRepository,
      shopkeeperRepository,
      accountRepository
    );
  });

  it("Should be able to make a bank transaction from natural person to shopkeeper", async () => {
    const payerAccount = makeAccount();
    payerAccount.deposit(120);
    const payer = makeNaturalPerson({ accountId: payerAccount.id });
    const payeeAccount = makeAccount();
    const payee = makeShopkeeper({ accountId: payeeAccount.id });

    accountRepository.items.push(payerAccount, payeeAccount);
    naturalPersonRepository.items.push(payer);
    shopkeeperRepository.items.push(payee);

    await sut.execute({
      payerId: payer.id.toString(),
      payeeId: payee.id.toString(),
      value: 115,
    });

    expect(payerAccount.balance).toEqual(5);
    expect(payeeAccount.balance).toEqual(115);
  });

  it("Should be able to make a bank transaction between natural people", async () => {
    const payerAccount = makeAccount();
    payerAccount.deposit(10);
    const payer = makeNaturalPerson({ accountId: payerAccount.id });
    const payeeAccount = makeAccount();
    const payee = makeNaturalPerson({ accountId: payeeAccount.id });

    accountRepository.items.push(payerAccount, payeeAccount);
    naturalPersonRepository.items.push(payer, payee);

    await sut.execute({
      payerId: payer.id.toString(),
      payeeId: payee.id.toString(),
      value: 7,
    });

    expect(payerAccount.balance).toEqual(3);
    expect(payeeAccount.balance).toEqual(7);
  });

  it("Should not be able to make a bank transaction from shopkeeper", async () => {
    const payerAccount = makeAccount();
    payerAccount.deposit(10);
    const payer = makeShopkeeper({ accountId: payerAccount.id });
    const payeeAccount = makeAccount();
    const payee = makeNaturalPerson({ accountId: payeeAccount.id });

    accountRepository.items.push(payerAccount, payeeAccount);
    shopkeeperRepository.items.push(payer);
    naturalPersonRepository.items.push(payee);

    await expect(() =>
      sut.execute({
        payerId: payer.id.toString(),
        payeeId: payee.id.toString(),
        value: 7,
      })
    ).rejects.toBeInstanceOf(NaturalPersonNotFoundError);
  });
});

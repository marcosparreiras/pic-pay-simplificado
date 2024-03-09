import { TransactionAccountNotFoundError } from "../../../core/Errors/transaction-account-not-found-error";
import { UserNotFoundError } from "../../../core/Errors/user-not-found-error";
import { AccountRepository } from "../repositories/account-repository";
import { NaturalPersonRepository } from "../repositories/natural-person-repository";
import { shopkeeperRepository } from "../repositories/shopkeeper-repository";

interface BankTransactionUseCaseRequest {
  value: number;
  payerId: string;
  payeeId: string;
}

interface BankTransactionUseCaseResponse {
  success: boolean;
}

export class BankTransactionUseCase {
  constructor(
    private naturalPersonRepository: NaturalPersonRepository,
    private shopkeeperRepository: shopkeeperRepository,
    private accountRepository: AccountRepository
  ) {}

  async execute({
    value,
    payerId,
    payeeId,
  }: BankTransactionUseCaseRequest): Promise<BankTransactionUseCaseResponse> {
    const payer = await this.naturalPersonRepository.findById(payerId);
    if (!payer) {
      throw new UserNotFoundError(payerId);
    }

    const payeeQuery = await Promise.all([
      this.naturalPersonRepository.findById(payeeId),
      this.shopkeeperRepository.findById(payeeId),
    ]);
    const payee = payeeQuery.find((result) => result != null);
    if (!payee) {
      throw new UserNotFoundError(payeeId);
    }

    const [payerAccount, payeeAccount] = await Promise.all([
      this.accountRepository.findById(payer.accountId.toString()),
      this.accountRepository.findById(payee.accountId.toString()),
    ]);

    if (payerAccount === null || payeeAccount === null) {
      throw new TransactionAccountNotFoundError();
    }

    payerAccount.withdraw(value);
    payeeAccount.deposit(value);
    await this.accountRepository.bankTransaction(payerAccount, payeeAccount);

    return { success: true };
  }
}

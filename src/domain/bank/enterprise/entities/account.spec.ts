import { InvalidDepositValueError } from "../../../core/Errors/invalid-deposit-value-error";
import { InvalidWithdrawValueError } from "../../../core/Errors/invalid-withdraw-value-error";
import { Account } from "./account";

describe("Account [Entity]", () => {
  let account: Account;
  const initialValue = 100;

  beforeEach(() => {
    account = Account.create({ balance: initialValue });
  });

  it("Should be able to deposit a value in the account", () => {
    const value = 54.26;
    account.deposit(value);
    expect(account.balance).toEqual(initialValue + value);
  });

  it("Should not be able to deposit a negative value", () => {
    const value = -120;
    expect(() => account.deposit(value)).toThrowError(
      new InvalidDepositValueError(value)
    );
  });

  it("Should be able to withdraw a value of the account", () => {
    const value = 25.5;
    account.withdraw(value);
    expect(account.balance).toEqual(initialValue - value);
  });

  it("Should not be able to withdraw a negative value of the account", () => {
    const value = -36.25;
    expect(() => account.withdraw(value)).toThrowError(
      new InvalidWithdrawValueError(value)
    );
  });

  it("Should not be able to withdraw more then account balance", () => {
    const value = 120;
    expect(() => account.withdraw(value)).toThrowError(
      new InvalidWithdrawValueError(value)
    );
  });
});

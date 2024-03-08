import { InvalidDepositValueError } from "../../../core/Errors/invalid-deposit-value-error";
import { InvalidWithdrawValueError } from "../../../core/Errors/invalid-withdraw-value-error";
import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

export interface AccountProps {
  balance: number;
}

export class Account extends Entity<AccountProps> {
  get balance() {
    return this.props.balance;
  }

  static create(
    props: Optional<AccountProps, "balance"> = {},
    id?: UniqueEntityId
  ) {
    return new Account({ balance: props.balance ?? 0 }, id);
  }

  public deposit(value: number) {
    if (value < 0) {
      throw new InvalidDepositValueError(value);
    }
    this.props.balance += value;
  }

  public withdraw(value: number) {
    if (value < 0 || this.props.balance < value) {
      throw new InvalidWithdrawValueError(value);
    }
    this.props.balance -= value;
  }
}

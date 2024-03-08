import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

export interface NaturalPersonProps {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
  accountId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date;
}

export class NaturalPerson extends Entity<NaturalPersonProps> {
  get fullName() {
    return this.props.fullName;
  }

  get cpf() {
    return this.props.cpf;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get accountId() {
    return this.props.accountId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<NaturalPersonProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    return new NaturalPerson(
      {
        fullName: props.fullName,
        cpf: props.cpf,
        email: props.email,
        password: props.password,
        accountId: props.accountId,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt,
      },
      id
    );
  }
}

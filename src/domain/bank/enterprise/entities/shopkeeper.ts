import { Entity } from "../../../core/entities/entity";
import { UniqueEntityId } from "../../../core/entities/unique-entity-id";
import { Optional } from "../../../core/types/optional";

export interface ShopkeeperProps {
  shopName: string;
  cnpj: string;
  email: string;
  password: string;
  accountId: UniqueEntityId;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Shopkeeper extends Entity<ShopkeeperProps> {
  get shopName() {
    return this.props.shopName;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get email() {
    return this.props.email;
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get password() {
    return this.props.password;
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
    props: Optional<ShopkeeperProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    return new Shopkeeper(
      {
        shopName: props.shopName,
        cnpj: props.cnpj,
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

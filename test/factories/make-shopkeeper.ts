import {
  Shopkeeper,
  ShopkeeperProps,
} from "../../src/domain/bank/enterprise/entities/shopkeeper";
import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";
import { faker } from "@faker-js/faker";

export function makeShopkeeper(
  overide: Partial<ShopkeeperProps> = {},
  id?: UniqueEntityId
) {
  return Shopkeeper.create(
    {
      shopName: faker.company.name(),
      cnpj: Math.floor(Math.random() * Math.pow(10, 11)).toString(),
      accountId: new UniqueEntityId(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...overide,
    },
    id
  );
}

import {
  NaturalPerson,
  NaturalPersonProps,
} from "../../src/domain/bank/enterprise/entities/natural-person";
import { UniqueEntityId } from "../../src/domain/core/entities/unique-entity-id";
import { faker } from "@faker-js/faker";

export function makeNaturalPerson(
  overide: Partial<NaturalPersonProps> = {},
  id?: UniqueEntityId
) {
  return NaturalPerson.create(
    {
      fullName: faker.internet.userName(),
      cpf: Math.floor(Math.random() * Math.pow(10, 11)).toString(),
      accountId: new UniqueEntityId(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...overide,
    },
    id
  );
}

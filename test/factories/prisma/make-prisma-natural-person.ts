import { NaturalPersonProps } from "../../../src/domain/bank/enterprise/entities/natural-person";
import { UniqueEntityId } from "../../../src/domain/core/entities/unique-entity-id";
import { PrismaNaturalPersonMapper } from "../../../src/infra/repositories/prisma/mappers/prisma-natural-person-mapper";
import { prisma } from "../../../src/infra/repositories/prisma/prisma-service";
import { makeNaturalPerson } from "../make-natural-person";

export async function makePrismaNaturalPerson(
  overide: Partial<NaturalPersonProps> = {},
  id?: UniqueEntityId
) {
  const naturalPerson = makeNaturalPerson(overide, id);
  const data = PrismaNaturalPersonMapper.toPrisma(naturalPerson);
  await prisma.user.create({ data });
  return naturalPerson;
}

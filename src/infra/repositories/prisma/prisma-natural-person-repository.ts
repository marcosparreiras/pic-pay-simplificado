import { NaturalPersonRepository } from "../../../domain/bank/application/repositories/natural-person-repository";
import { NaturalPerson } from "../../../domain/bank/enterprise/entities/natural-person";
import { PrismaNaturalPersonMapper } from "./mappers/prisma-natural-person-mapper";
import { prisma } from "./prisma-service";

export class PrismaNaturalPersonRepository implements NaturalPersonRepository {
  async findByEmail(email: string): Promise<NaturalPerson | null> {
    const data = await prisma.user.findUnique({
      where: { email, type: "NATURAL" },
    });
    if (!data) {
      return null;
    }
    return PrismaNaturalPersonMapper.toDomain(data);
  }

  async findById(id: string): Promise<NaturalPerson | null> {
    const data = await prisma.user.findUnique({
      where: { id, type: "NATURAL" },
    });
    if (!data) {
      return null;
    }
    return PrismaNaturalPersonMapper.toDomain(data);
  }

  async findByCpf(cpf: string): Promise<NaturalPerson | null> {
    const data = await prisma.user.findUnique({
      where: { document: cpf, type: "NATURAL" },
    });
    if (!data) {
      return null;
    }
    return PrismaNaturalPersonMapper.toDomain(data);
  }

  async create(naturalPerson: NaturalPerson): Promise<void> {
    const data = PrismaNaturalPersonMapper.toPrisma(naturalPerson);
    await prisma.user.create({ data });
  }
}

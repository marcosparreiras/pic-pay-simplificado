import { User as PrismaUser } from "@prisma/client";
import { NaturalPerson } from "../../../../domain/bank/enterprise/entities/natural-person";
import { UniqueEntityId } from "../../../../domain/core/entities/unique-entity-id";

export class PrismaNaturalPersonMapper {
  static toDomain(data: PrismaUser): NaturalPerson {
    if (data.type !== "NATURAL") {
      throw new Error(
        "Invalid user type - Only (NATURAL) users can be mapped to NaturalPerson"
      );
    }
    return NaturalPerson.create(
      {
        fullName: data.name,
        cpf: data.document,
        email: data.email,
        accountId: new UniqueEntityId(data.accountId),
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updateAt,
      },
      new UniqueEntityId(data.id)
    );
  }

  static toPrisma(data: NaturalPerson): PrismaUser {
    return {
      id: data.id.toString(),
      name: data.fullName,
      email: data.email,
      document: data.cpf,
      password: data.password,
      createdAt: data.createdAt,
      updateAt: data.updatedAt ?? null,
      type: "NATURAL",
      accountId: data.accountId.toString(),
    };
  }
}

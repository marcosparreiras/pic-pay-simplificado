import { User as PrismaUser } from "@prisma/client";
import { Shopkeeper } from "../../../../domain/bank/enterprise/entities/shopkeeper";
import { UniqueEntityId } from "../../../../domain/core/entities/unique-entity-id";

export class PrismaShopkeeperMapper {
  static toDomain(data: PrismaUser): Shopkeeper {
    if (data.type !== "SHOPKEEPER") {
      throw new Error(
        "Invalid user type - Only (SHOPKEEPER) users can be mapped to Shopkeeper"
      );
    }
    return Shopkeeper.create(
      {
        shopName: data.name,
        accountId: new UniqueEntityId(data.accountId),
        cnpj: data.document,
        email: data.email,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updateAt,
      },
      new UniqueEntityId(data.id)
    );
  }

  static toPrisma(data: Shopkeeper): PrismaUser {
    return {
      type: "SHOPKEEPER",
      accountId: data.accountId.toString(),
      createdAt: data.createdAt,
      document: data.cnpj,
      email: data.email,
      id: data.id.toString(),
      name: data.shopName,
      password: data.password,
      updateAt: data.updatedAt ?? null,
    };
  }
}

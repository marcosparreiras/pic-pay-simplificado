import { ShopkeeperProps } from "../../../src/domain/bank/enterprise/entities/shopkeeper";
import { UniqueEntityId } from "../../../src/domain/core/entities/unique-entity-id";
import { PrismaShopkeeperMapper } from "../../../src/infra/repositories/prisma/mappers/prisma-shopkeeper-mapper";
import { prisma } from "../../../src/infra/repositories/prisma/prisma-service";
import { makeShopkeeper } from "../make-shopkeeper";

export async function makePrismaShopkeeper(
  overide: Partial<ShopkeeperProps> = {},
  id?: UniqueEntityId
) {
  const shopkeeper = makeShopkeeper(overide, id);
  const data = PrismaShopkeeperMapper.toPrisma(shopkeeper);
  await prisma.user.create({ data });
  return shopkeeper;
}

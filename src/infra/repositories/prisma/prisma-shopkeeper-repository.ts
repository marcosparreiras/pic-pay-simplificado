import { ShopkeeperRepository } from "../../../domain/bank/application/repositories/shopkeeper-repository";
import { Shopkeeper } from "../../../domain/bank/enterprise/entities/shopkeeper";
import { PrismaShopkeeperMapper } from "./mappers/prisma-shopkeeper-mapper";
import { prisma } from "./prisma-service";

export class PrismaShopkeeperRepository implements ShopkeeperRepository {
  async findByEmail(email: string): Promise<Shopkeeper | null> {
    const data = await prisma.user.findUnique({
      where: { email, type: "SHOPKEEPER" },
    });
    if (!data) {
      return null;
    }
    return PrismaShopkeeperMapper.toDomain(data);
  }

  async findById(id: string): Promise<Shopkeeper | null> {
    const data = await prisma.user.findUnique({
      where: { id, type: "SHOPKEEPER" },
    });
    if (!data) {
      return null;
    }
    return PrismaShopkeeperMapper.toDomain(data);
  }

  async findByCnpj(cnpj: string): Promise<Shopkeeper | null> {
    const data = await prisma.user.findUnique({
      where: { document: cnpj, type: "SHOPKEEPER" },
    });
    if (!data) {
      return null;
    }
    return PrismaShopkeeperMapper.toDomain(data);
  }

  async create(shopkeeper: Shopkeeper): Promise<void> {
    const data = PrismaShopkeeperMapper.toPrisma(shopkeeper);
    await prisma.user.create({ data });
  }
}

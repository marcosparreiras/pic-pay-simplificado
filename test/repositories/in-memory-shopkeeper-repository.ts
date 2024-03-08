import { shopkeeperRepository } from "../../src/domain/bank/application/repositories/shopkeeper-repository";
import { Shopkeeper } from "../../src/domain/bank/enterprise/entities/shopkeeper";

export class InMemoryShopKeeperRepository implements shopkeeperRepository {
  public items: Shopkeeper[] = [];

  async findByEmail(email: string): Promise<Shopkeeper | null> {
    const shopkeeper = this.items.find((item) => item.email === email);
    return shopkeeper ?? null;
  }

  async create(shopkeeper: Shopkeeper): Promise<void> {
    this.items.push(shopkeeper);
  }
}

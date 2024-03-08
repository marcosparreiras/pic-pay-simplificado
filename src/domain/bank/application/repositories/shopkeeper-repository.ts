import { Shopkeeper } from "../../enterprise/entities/shopkeeper";

export interface shopkeeperRepository {
  findByEmail(email: string): Promise<Shopkeeper | null>;
  create(shopkeeper: Shopkeeper): Promise<void>;
}

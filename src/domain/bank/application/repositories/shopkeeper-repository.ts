import { Shopkeeper } from "../../enterprise/entities/shopkeeper";

export interface ShopkeeperRepository {
  findByEmail(email: string): Promise<Shopkeeper | null>;
  findById(id: string): Promise<Shopkeeper | null>;
  findByCnpj(cnpj: string): Promise<Shopkeeper | null>;
  create(shopkeeper: Shopkeeper): Promise<void>;
}

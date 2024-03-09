import { NaturalPerson } from "../../enterprise/entities/natural-person";

export interface NaturalPersonRepository {
  findByEmail(email: string): Promise<NaturalPerson | null>;
  findById(id: string): Promise<NaturalPerson | null>;
  findByCpf(cpf: string): Promise<NaturalPerson | null>;
  create(naturalPerson: NaturalPerson): Promise<void>;
}

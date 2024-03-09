import { NaturalPersonRepository } from "../../src/domain/bank/application/repositories/natural-person-repository";
import { NaturalPerson } from "../../src/domain/bank/enterprise/entities/natural-person";

export class InMemoryNaturalPersonRepository
  implements NaturalPersonRepository
{
  public items: NaturalPerson[] = [];

  async findById(id: string): Promise<NaturalPerson | null> {
    const naturalPerson = this.items.find((item) => item.id.toString() === id);
    return naturalPerson ?? null;
  }

  async findByEmail(email: string): Promise<NaturalPerson | null> {
    const naturalPerson = this.items.find((item) => item.email === email);
    return naturalPerson ?? null;
  }

  async findByCpf(cpf: string): Promise<NaturalPerson | null> {
    const naturalPerson = this.items.find((item) => item.cpf === cpf);
    return naturalPerson ?? null;
  }

  async create(naturalPerson: NaturalPerson): Promise<void> {
    this.items.push(naturalPerson);
  }
}

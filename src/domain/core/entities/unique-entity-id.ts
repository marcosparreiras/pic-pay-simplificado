import { randomUUID } from "crypto";

export class UniqueEntityId {
  private value: string;

  public toString() {
    return this.value;
  }

  public isEqual(id: UniqueEntityId) {
    return this.toString() === id.toString();
  }

  constructor(id?: string) {
    this.value = id ?? randomUUID();
  }
}

import axios from "axios";

export class TransactionAuthorizationService {
  static async execute(): Promise<boolean> {
    const { data } = await axios.get<{ message: string }>(
      "https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc"
    );
    if (data.message === "Autorizado") {
      return true;
    }
    return false;
  }
}

import axios from "axios";
import { env } from "../env";

export class TransactionAuthorizationService {
  static async execute(): Promise<boolean> {
    const { data } = await axios.get<{ message: string }>(
      env.TRANSACTION_AUTHORIZATION_SERVICE_URI
    );
    if (data.message === "Autorizado") {
      return true;
    }
    return false;
  }
}

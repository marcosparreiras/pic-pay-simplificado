import { sign, verify } from "jsonwebtoken";
import { env } from "../env";

export class JwtService {
  static async generate(id: string): Promise<string> {
    const token = sign({ id }, env.JWT_SECRET, { expiresIn: "1d" });
    return token;
  }

  static async validate(token: string): Promise<string> {
    throw new Error("Not implemented yet");
  }
}

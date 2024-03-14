import { JsonWebTokenError, JwtPayload, sign, verify } from "jsonwebtoken";
import { env } from "../env";

export class JwtService {
  static async generate(id: string): Promise<string> {
    const token = sign({ id }, env.JWT_SECRET, { expiresIn: "1d" });
    return token;
  }

  static async validate(token: string) {
    const payload = verify(token, env.JWT_SECRET);
    if (!Object.keys(payload).includes("id") || typeof payload === "string") {
      throw new JsonWebTokenError("Invalid Token payload");
    }
    return payload.id;
  }
}

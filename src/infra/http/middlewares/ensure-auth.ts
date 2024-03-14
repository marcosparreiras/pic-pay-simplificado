import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../cryptography/json-web-token-service";
import { TokenNotFoundError } from "../../errors/token-not-found-error";

export async function ensureAuthMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new TokenNotFoundError();
    }
    const id = await JwtService.validate(token);
    request.userId = id;
    return next();
  } catch (error: unknown) {
    return next(error);
  }
}

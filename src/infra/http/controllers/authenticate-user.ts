import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { makeAuthenticateUserUseCase } from "../../factories/make-authenticate-user";
import { JwtService } from "../../cryptography/json-web-token-service";

export async function authenticateUserController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  try {
    const { email, password } = requestBodySchema.parse(request.body);
    const authenticateUserUseCase = makeAuthenticateUserUseCase();
    const { user } = await authenticateUserUseCase.execute({ email, password });
    const token = await JwtService.generate(user.id.toString());
    return response.status(200).json({ token });
  } catch (error: unknown) {
    return next(error);
  }
}

import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { makeShopkeeperUseCase } from "../../factories/make-create-shopkeeper";

export async function createShopkeeperController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    shopName: z.string().min(3),
    cnpj: z.string().min(14),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { shopName, cnpj, email, password } = requestBodySchema.parse(
      request.body
    );

    const createShopkeeperUseCase = makeShopkeeperUseCase();
    await createShopkeeperUseCase.execute({ shopName, cnpj, email, password });

    return response.status(201).json();
  } catch (error: unknown) {
    return next(error);
  }
}

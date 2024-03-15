import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { makeCreateNaturalPersonUseCase } from "../../factories/make-create-natural-person";

export async function createNaturalPersonController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    fullName: z.string().min(3),
    cpf: z.string().min(11),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { fullName, cpf, email, password } = requestBodySchema.parse(
      request.body
    );

    const createPersonUseCase = makeCreateNaturalPersonUseCase();
    await createPersonUseCase.execute({ fullName, cpf, email, password });

    return response.status(201).json();
  } catch (error: unknown) {
    console.log(error);

    return next(error);
  }
}

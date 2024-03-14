import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { makeBankTransaction } from "../../factories/make-bank-transaction";

export async function bankTransactionController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    value: z.coerce.number(),
    payerId: z.string(),
    payeeId: z.string(),
  });
  try {
    const { value, payeeId, payerId } = requestBodySchema.parse(request.body);
    const bankTransactionUseCase = makeBankTransaction();
    await bankTransactionUseCase.execute({ value, payeeId, payerId });
    return response.status(204).json();
  } catch (error: unknown) {
    return next(error);
  }
}

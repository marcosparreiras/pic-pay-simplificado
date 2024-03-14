import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { makeBankTransaction } from "../../factories/make-bank-transaction";
import { TransactionAuthorizationService } from "../../api/transaction-authorization-service";
import { NotificationService } from "../../api/notification-service";
import { TransactionAuthorizationError } from "../../errors/transaction-authorization-error";

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

    const transactionAuthorization =
      await TransactionAuthorizationService.execute();
    if (!transactionAuthorization) {
      throw new TransactionAuthorizationError();
    }

    const bankTransactionUseCase = makeBankTransaction();
    await bankTransactionUseCase.execute({ value, payeeId, payerId });

    await NotificationService.execute({
      to: payeeId,
      message: `you received a transaction of ${value}$`,
    });

    return response.status(204).json();
  } catch (error: unknown) {
    return next(error);
  }
}

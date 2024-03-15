import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { TokenNotFoundError } from "../../errors/token-not-found-error";
import { DomainError } from "../../../domain/core/Errors/domain-error";
import { TransactionAuthorizationError } from "../../errors/transaction-authorization-error";
import { UnauthorizedActionError } from "../../errors/unauthorized-action-error";

export function ErrorHanlderMiddleware(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: error,
    });
  }
  if (
    error instanceof JsonWebTokenError ||
    error instanceof TokenNotFoundError ||
    error instanceof TransactionAuthorizationError ||
    error instanceof UnauthorizedActionError
  ) {
    return response.status(401).json({
      message: error.message,
    });
  }
  if (error instanceof DomainError) {
    return response.status(400).json({
      message: error.message,
    });
  }
  console.log(error);
  return response.status(500).json({
    message: "Internal server error",
  });
}

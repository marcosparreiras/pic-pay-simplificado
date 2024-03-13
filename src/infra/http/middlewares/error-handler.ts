import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { EmailAlreadyExistsError } from "../../../domain/core/Errors/email-already-in-use-error";
import { CpfAlreadyExistsError } from "../../../domain/core/Errors/cpf-already-in-use-error";

export function ErrorHanlderMiddleware(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  switch (error.constructor) {
    case ZodError:
      return response.status(400).json({
        message: error,
      });
    case EmailAlreadyExistsError:
      return response.status(400).json({
        message: error.message,
      });
    case CpfAlreadyExistsError:
      return response.status(400).json({
        message: error.message,
      });
    default:
      console.log(error);
      return response.status(500).json({
        message: "Internal server error",
      });
  }
}
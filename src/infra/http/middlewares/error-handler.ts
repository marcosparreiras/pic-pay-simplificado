import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { EmailAlreadyExistsError } from "../../../domain/core/Errors/email-already-in-use-error";
import { CpfAlreadyExistsError } from "../../../domain/core/Errors/cpf-already-in-use-error";
import { JsonWebTokenError } from "jsonwebtoken";
import { TokenNotFoundError } from "../../errors/token-not-found-error";
import { CnpjAlreadyExistsError } from "../../../domain/core/Errors/cnpj-already-in-use-error";

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
    case JsonWebTokenError:
      return response.status(401).json({
        message: error.message,
      });
    case TokenNotFoundError:
      return response.status(401).json({
        message: error.message,
      });
    case EmailAlreadyExistsError:
      return response.status(400).json({
        message: error.message,
      });
    case CpfAlreadyExistsError:
      return response.status(400).json({
        message: error.message,
      });
    case CnpjAlreadyExistsError:
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

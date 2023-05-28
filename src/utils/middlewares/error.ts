import { Request, Response } from 'express';
import BaseError from '../errors/base-error';

export const errorMiddleware = (error: BaseError, req: Request, res: Response) => {
  const message = error.message || 'Something went wrong';
  const errorResponse: Record<string, string> = {
    message
  }

  if (error.stack && process.env.NODE_ENV !== 'production') {
    errorResponse["stack"] = error.stack;
  }


  return res.status(error.httpCode).send(errorResponse);
}
import { Request, Response, NextFunction } from 'express';
import httpContext from 'express-http-context';
import { verifyToken } from '../jwt';
import BaseError from '../errors/base-error';


export const extractUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const user = verifyToken(token);
      httpContext.set('user', user);
    }
    next();
  } catch (error: any) {
    const baseError = new BaseError(error.message, 'app-004', 401)
    next(baseError)
  }

}
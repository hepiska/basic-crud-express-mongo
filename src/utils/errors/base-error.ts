import logger from "../logger";

class BaseError extends Error {
  code: string;
  httpCode: number;
  constructor(message: string, code?: string, httpCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || "INTERNAL_SERVER_ERROR";
    this.httpCode = httpCode || 500;
    Error.captureStackTrace(this, this.constructor);
    logger.error(`${message} -- ${code} -- ${httpCode} ${this.stack} `)
  }
}


export default BaseError;
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException, NotFoundException, MissingArgumentsException } from '../utils/Exceptions';
import { HTTP } from '../utils/http';
import { ZodError } from 'zod';

class ErrorHandler {
  public handle(err: Error, _: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof UnauthorizedException) {
      return res.status(err.statusCode).json({ error: err.name, message: err.message });
    }

    if (err instanceof NotFoundException) {
      return res.status(err.statusCode).json({ error: err.name, message: err.message });
    }

    if (err instanceof MissingArgumentsException) {
      return res.status(err.statusCode).json({ error: err.name, message: err.message });
    }

    if (err instanceof ZodError) {
      const errorMessage = err.errors.map((error) => error.message).join('; ');
      return res.status(HTTP.BAD_REQUEST.CODE).json({ message: errorMessage });
    }

    console.log(err);

    res.status(HTTP.INTERNAL_SERVER_ERROR.CODE).json({ errorMessage: HTTP.INTERNAL_SERVER_ERROR.MESSAGE });
  }
}

export default new ErrorHandler();

import { Request, Response, NextFunction } from 'express';
import { MissingArgumentsException } from '../utils/Exceptions';
import jwt from 'jsonwebtoken';
import appConfig from '../config/appConfig';

class AdminAuthValidator {
  constructor() {
    this.validate = this.validate.bind(this);
  }

  private extractToken({ bearer }: { bearer: string }) {
    const token = bearer.split(' ')[1];

    if (!token) {
      throw new MissingArgumentsException();
    }

    return token;
  }

  public validate(req: Request, _: Response, next: NextFunction) {
    try {
      const reqAuthToken = req.headers.authorization;

      if (!reqAuthToken) {
        throw new MissingArgumentsException();
      }

      const reqToken = this.extractToken({ bearer: reqAuthToken });

      jwt.verify(reqToken, appConfig.app.JWT_SECRET);

      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new AdminAuthValidator();

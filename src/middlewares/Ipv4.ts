import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../utils/Exceptions';

class Ipv4 {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const ip = req.ip;

      if (!req.ip) {
        throw new UnauthorizedException();
      }

      req.clientIp = ip;

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default new Ipv4();

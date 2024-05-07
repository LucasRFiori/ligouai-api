import { NextFunction, Request, Response } from 'express';

class Ipv4 {
  async handle(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;

    req.clientIp = ip;

    next();
  }
}

export default new Ipv4();

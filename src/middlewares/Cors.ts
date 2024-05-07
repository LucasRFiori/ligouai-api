import { NextFunction, Request, Response } from 'express';

class Cors {
  set(req: Request, res: Response, next: NextFunction, allowedOrigins: string[]) {
    const origin = req?.headers?.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
  }
}

export default new Cors();

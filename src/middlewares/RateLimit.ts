import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { HTTP } from '../utils/http';

interface RateLimitParams {
  windowMs?: number;
  limit?: number;
}

export const RateLimit = ({ limit, windowMs }: RateLimitParams) =>
  rateLimit({
    windowMs: windowMs || 2 * 60 * 1000,
    limit: limit || 20,
    keyGenerator(req: Request): string {
      return req.clientIp!;
    },
    handler(_, res: Response): void {
      res.status(HTTP.TOO_MANY_REQUESTS.CODE).json(HTTP.TOO_MANY_REQUESTS.MESSAGE);
    },
  });

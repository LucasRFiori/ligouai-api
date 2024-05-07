import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const bodySchema = z.object({
  phone: z
    .string({
      required_error: 'phone param is required',
    })
    .min(3)
    .max(13)
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'phone must contain only numbers',
    }),
});

export type FindByPhoneParam = z.infer<typeof bodySchema>;

class findByPhoneDto {
  public async validate(req: Request, _: Response, next: NextFunction) {
    try {
      await bodySchema.parseAsync(req.params);
      return next();
    } catch (err) {
      next(err);
    }
  }
}

export default new findByPhoneDto();

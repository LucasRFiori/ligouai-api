import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import appConfig from '../config/appConfig';

const bodySchema = z
  .object({
    userName: z
      .string({
        required_error: 'userName is required',
      })
      .min(1)
      .max(43),
    comment: z
      .string({
        required_error: 'comment is required',
      })
      .min(5)
      .max(350),
    rating: z
      .number({
        message: 'The rating must be in the 1 to 5 range',
      })
      .min(0)
      .max(appConfig.app.MAX_RATING),
    phone: z
      .string({
        required_error: 'phone is required',
      })
      .max(13),
    tags: z.string().array().nullable(),
  })
  .refine((val) => val !== null, {
    message: 'body is required',
  });

export type CreateCommentBodyType = z.infer<typeof bodySchema>;

class CreateCommentDto {
  public async validate(req: Request, _: Response, next: NextFunction) {
    try {
      await bodySchema.parseAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export default new CreateCommentDto();

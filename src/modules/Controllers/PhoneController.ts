import { NextFunction, Request, Response } from 'express';
import PhoneRepositories from '../Repositories/PhoneRepositories';
import { HTTP } from '../../utils/http';
import { CreatePhoneBodyType } from '../../dto/create-phone-dto';
import { onlyNumbers } from '../../utils/onlyNumbers';
import { FindByPhoneParam } from '../../dto/findby-phone-dto';
import { NotFoundException } from '../../utils/Exceptions';

class PhoneController {
  public async index(_: Request, res: Response, next: NextFunction) {
    try {
      const phoneList = await PhoneRepositories.findAll({
        include: {
          Comment: true,
        },
      });

      res.json(phoneList);
    } catch (err) {
      next(err);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as CreatePhoneBodyType;

      const maybePhone = await PhoneRepositories.findByIds({
        where: {
          phone: onlyNumbers(body.phone),
        },
        select: {
          phone: true,
        },
      });

      if (maybePhone?.phone) {
        return res.status(HTTP.OK.CODE).json(maybePhone);
      }

      const createdPhone = await PhoneRepositories.create({
        data: {
          phone: body.phone.toLowerCase(),
          rating: 0,
          ratingSum: 0,
          updatedAt: new Date(),
        },
        select: {
          phone: true,
        },
      });

      res.status(HTTP.CREATED.CODE).json(createdPhone);
    } catch (err) {
      next(err);
    }
  }

  public async findByPhone(req: Request, res: Response, next: NextFunction) {
    try {
      const param = req.params as FindByPhoneParam;

      const phone = await PhoneRepositories.findByIds({
        where: {
          phone: param.phone,
        },
        select: {
          Comment: {
            select: {
              comment: true,
              rating: true,
              userName: true,
              createdAt: true,
              tags: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 5,
          },
          phone: true,
          rating: true,
          tags: true,
          createdAt: true,
        },
      });

      if (!phone) {
        throw new NotFoundException();
      }

      res.json(phone);
    } catch (err) {
      next(err);
    }
  }
}

export default new PhoneController();

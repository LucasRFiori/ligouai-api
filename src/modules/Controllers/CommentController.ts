import { NextFunction, Request, Response } from 'express';
import CommentRepositories from '../Repositories/CommentRepositories';
import { HTTP } from '../../utils/http';
import { CreateCommentBodyType } from '../../dto/create-comment-dto';
import PhoneRepositories from '../Repositories/PhoneRepositories';
import { NotFoundException } from '../../utils/Exceptions';

class CommentController {
  public async index(_: Request, res: Response, next: NextFunction) {
    try {
      const comments = await CommentRepositories.findAll({
        include: {
          phoneNumber: true,
        },
      });

      res.json(comments);
    } catch (err) {
      next(err);
    }
  }

  public async store(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as CreateCommentBodyType;

      const phoneData = await PhoneRepositories.findByIds({
        where: {
          phone: body.phone,
        },
        include: {
          Comment: true,
        },
      });

      if (!phoneData) {
        throw new NotFoundException();
      }

      type PhoneData = typeof phoneData;

      interface PhoneDataWithComments extends PhoneData {
        Comment: CreateCommentBodyType[];
      }

      const dbPhone = phoneData as PhoneDataWithComments;

      const commentsTags = await CommentRepositories.findAll({
        where: {
          phoneId: dbPhone.id,
        },
        select: {
          tags: true,
        },
      });

      const commentTagsArr = commentsTags?.map((tags) => tags.tags).flat() || [];

      const tagsToInsert = CommentRepositories.mountTags(commentTagsArr, body.tags);

      const newRating = CommentRepositories.calcNewRating(dbPhone?.ratingSum + body.rating, dbPhone.Comment.length);

      await PhoneRepositories.update({
        data: {
          rating: Number(newRating),
          ratingSum: {
            increment: body.rating,
          },
          tags: tagsToInsert,
          updatedAt: new Date(),
        },
        where: {
          id: dbPhone.id,
        },
      });

      const createdComment = await CommentRepositories.create({
        data: {
          userName: body.userName,
          comment: body.comment,
          rating: body.rating,
          phoneId: phoneData.id,
          tags: body.tags || [],
        },
        select: {
          userName: true,
          comment: true,
          rating: true,
          tags: true,
          createdAt: true,
        },
      });

      res.status(HTTP.CREATED.CODE).json(createdComment);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async recent(_: Request, res: Response, next: NextFunction) {
    try {
      const recentComments = await CommentRepositories.findAll({
        select: {
          comment: true,
          rating: true,
          userName: true,
          phoneNumber: {
            select: {
              phone: true,
            },
          },
          tags: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
      });

      res.json(recentComments);
    } catch (err) {
      next(err);
    }
  }
}

export default new CommentController();

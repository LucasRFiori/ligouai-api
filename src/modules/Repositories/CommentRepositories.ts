import { Prisma, PrismaClient } from '@prisma/client';
import { countTags } from '../../utils/countTags';

const prisma = new PrismaClient();

class CommentRepositories {
  public async findAll(args?: Prisma.CommentFindManyArgs) {
    const phones = await prisma.comment.findMany({ ...args });

    return phones;
  }

  public async create(args: Prisma.CommentCreateArgs) {
    const createdComment = await prisma.comment.create(args);

    return createdComment;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mountTags(commentTags: string[], bodytags: string[] | null) {
    let tagList: string[] = [];

    if (commentTags.length) {
      tagList = commentTags.concat(bodytags || []);
    } else {
      tagList = bodytags || [];
    }

    const tags = countTags(tagList);

    return tags;
  }

  public calcNewRating(currPhoneRating: number, commentsQuantity: number) {
    return Number(currPhoneRating / (commentsQuantity + 1)).toFixed(2);
  }
}

export default new CommentRepositories();

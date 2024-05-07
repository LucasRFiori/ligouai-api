import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PhoneRepositories {
  findAll(args?: Prisma.PhoneNumberFindManyArgs) {
    const phones = prisma.phoneNumber.findMany(args);

    return phones;
  }

  findByIds(args: Prisma.PhoneNumberFindUniqueArgs) {
    const createdPhone = prisma.phoneNumber.findUnique(args);

    return createdPhone;
  }

  create(args: Prisma.PhoneNumberCreateArgs) {
    const createdPhone = prisma.phoneNumber.create(args);

    return createdPhone;
  }

  update(args: Prisma.PhoneNumberUpdateArgs) {
    const updatedPhone = prisma.phoneNumber.update(args);

    return updatedPhone;
  }
}

export default new PhoneRepositories();

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (
  data: Prisma.ComplianceTaskUncheckedCreateInput,
) => {
  return await prisma.complianceTask.create({
    data,
  });
};

export const findAllTasks = async () => {
  return await prisma.complianceTask.findMany({
    include: {
      contract: {
        select: { title: true, partnerName: true },
      },
    },
    orderBy: { deadline: 'asc' },
  });
};

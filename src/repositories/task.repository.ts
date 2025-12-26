import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (
  data: Prisma.ComplianceTaskUncheckedCreateInput,
) => {
  return await prisma.complianceTask.create({
    data,
  });
};

export const findAllTasks = async (showCompleted: boolean = false) => {
  return await prisma.complianceTask.findMany({
    where: {
      ...(showCompleted
        ? {}
        : {
            status: {
              not: 'COMPLETED',
            },
          }),
    },
    include: {
      contract: {
        select: { title: true, partnerName: true },
      },
    },
    orderBy: { deadline: 'asc' },
  });
};

export const findTasksByContractId = async (
  contractId: number,
  showCompleted: boolean = false,
) => {
  return await prisma.complianceTask.findMany({
    where: {
      contractId,
      ...(showCompleted
        ? {}
        : {
            status: {
              not: 'COMPLETED',
            },
          }),
    },
    orderBy: { deadline: 'asc' },
  });
};

export const updateTaskStatus = async (id: number, status: any) => {
  return await prisma.complianceTask.update({
    where: { id },
    data: { status },
    include: {
      contract: {
        select: { title: true },
      },
    },
  });
};

import { PrismaClient, Prisma, ContractStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data: Prisma.ContractCreateInput) => {
  return await prisma.contract.create({
    data,
  });
};

export const findDuplicate = async (
  title: string,
  partnerTaxCode: string | null,
) => {
  return await prisma.contract.findFirst({
    where: {
      title: title,
      partnerTaxCode: partnerTaxCode,
    },
  });
};

export const updateStatus = async (
  id: number,
  status: ContractStatus,
  signedAt?: Date,
) => {
  return await prisma.contract.update({
    where: { id },
    data: {
      status,
      signedAt: status === 'SIGNED' ? signedAt || new Date() : undefined,
    },
  });
};

export const findContractsPendingTasks = async () => {
  return await prisma.contract.findMany({
    where: {
      status: 'SIGNED',
      complianceTasks: { none: {} },
    },
  });
};

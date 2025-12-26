import { PrismaClient, Prisma } from '@prisma/client';

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

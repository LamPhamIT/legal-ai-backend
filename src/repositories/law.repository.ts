import { CreateLawInput } from '../dtos/law.schema';
import { prisma } from '../prisma/client';

export const createLaw = async (data: CreateLawInput) => {
  return prisma.law.create({
    data: {
      title: data.title,
      lawType: data.lawType,
      issuingBody: data.issuingBody,

      summary: data.summary,
      affectedEntities: data.affectedEntities,
      keyChanges: data.keyChanges,

      riskLevel: data.riskLevel,
      effectiveDate: new Date(data.effectiveDate),

      sourceUrl: data.sourceUrl,
      pdfUrl: data.pdfUrl,
    },
  });
};

/**
 * NÂNG CAO (OPTIONAL):
 * check luật trùng theo title + effectiveDate
 */
export const findDuplicateLaw = async (title: string, effectiveDate: Date) => {
  return prisma.law.findFirst({
    where: {
      title,
      effectiveDate,
    },
  });
};

export const getLatestLaws = async (limit = 10) => {
  return prisma.law.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
};

import { RiskLevel } from '@prisma/client';
import z from 'zod';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
};

export const createLawSchema = z.object({
  title: z.string().min(3),
  lawType: z.string().min(2),
  issuingBody: z.string().min(2),

  summary: z.string().min(10),
  affectedEntities: z.array(z.string().min(2)).min(1),
  keyChanges: z.array(z.string().min(5)).min(1),

  riskLevel: z.nativeEnum(RiskLevel),
  effectiveDate: z.string().transform(formatDate),

  sourceUrl: z.string().url(),
  pdfUrl: z.string().url().optional(),
});

export type CreateLawInput = z.infer<typeof createLawSchema>;

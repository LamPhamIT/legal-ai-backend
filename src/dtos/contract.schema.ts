import { z } from 'zod';

export const createContractSchema = z.object({
  title: z.string().min(1),
  contractType: z.string().min(1),
  partnerName: z.string().min(1),
  partnerTaxCode: z.string().optional().nullable(),
  contractValue: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z.number().nonnegative(),
  ),
  currency: z.string().default('VND'),
  content: z.string().min(1),
  documentUrl: z.string().url().nullable(),
  riskScore: z.number().int().default(0),
  riskNote: z.string().optional().nullable(),
  riskAssessment: z.any().optional(),
  status: z.enum(['DRAFT', 'SIGNED', 'CANCELLED']).default('DRAFT'),
  lawId: z.number().int().optional().nullable(),
});

export type ContractCreateInput = z.infer<typeof createContractSchema>;

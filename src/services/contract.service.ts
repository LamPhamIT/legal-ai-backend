import { ContractCreateInput } from '../dtos/contract.schema.js';
import * as contractRepo from '../repositories/contract.repository';

export const processAndStore = async (input: ContractCreateInput) => {
  const existed = await contractRepo.findDuplicate(
    input.title,
    input.partnerTaxCode || null,
  );

  if (existed) {
    throw new Error('CONTRACT_ALREADY_EXISTS');
  }

  const dataToSave = { ...input };

  if (!dataToSave.riskScore && input.riskAssessment?.overall_score) {
    dataToSave.riskScore = input.riskAssessment.overall_score;
  }

  return await contractRepo.create(dataToSave as any);
};

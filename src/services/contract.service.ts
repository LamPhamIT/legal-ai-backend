import { ContractStatus } from '@prisma/client';
import { ContractCreateInput } from '../dtos/contract.schema.js';
import * as contractRepo from '../repositories/contract.repository';
import axios from 'axios';

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

  return await contractRepo.create(dataToSave as ContractCreateInput);
};

export const updateContractStatus = async (
  id: number,
  status: ContractStatus,
) => {
  const updatedContract = await contractRepo.updateStatus(id, status);

  if (status === ContractStatus.SIGNED) {
    await axios
      .post(process.env.N8N_WEBHOOK_URL_WORKFLOW_3 || '', {
        event: 'CONTRACT_SIGNED_TRIGGER',
        contract: updatedContract,
      })
      .catch((err: { message: unknown }) =>
        console.error('Errror Webhook n8n:', err.message),
      );
  }

  return updatedContract;
};

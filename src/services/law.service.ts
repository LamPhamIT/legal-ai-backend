import * as lawRepo from '../repositories/law.repository';
import { CreateLawInput } from '../dtos/law.schema';

export const createLaw = async (input: CreateLawInput) => {
  const existed = await lawRepo.findDuplicateLaw(
    input.title,
    new Date(input.effectiveDate),
  );

  if (existed) {
    throw new Error('LAW_ALREADY_EXISTS');
  }

  return lawRepo.createLaw(input);
};

export const getLatestLaws = async () => {
  return lawRepo.getLatestLaws(10);
};

import { Prisma } from '@prisma/client';
import * as taskRepo from '../repositories/task.repository';

export const createComplianceTask = async (
  data: Prisma.ComplianceTaskUncheckedCreateInput,
) => {
  const formattedData = {
    ...data,
    contractId: Number(data.contractId),
    deadline: new Date(data.deadline),
  };

  if (formattedData.deadline < new Date()) {
    console.warn('Deadline is in the past');
  }

  return await taskRepo.createTask(formattedData);
};

export const getDashboardTasks = async () => {
  return await taskRepo.findAllTasks();
};

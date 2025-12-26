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

export const getDashboardTasks = async (includeCompleted?: string) => {
  const shouldShowAll = includeCompleted === 'true';
  return await taskRepo.findAllTasks(shouldShowAll);
};

export const getTasksByContract = async (
  contractId: string,
  includeCompleted?: string,
) => {
  const shouldShowAll = includeCompleted === 'true';
  return await taskRepo.findTasksByContractId(
    Number(contractId),
    shouldShowAll,
  );
};

export const updateTaskStatus = async (id: string, status: string) => {
  const taskId = Number(id);
  if (isNaN(taskId)) {
    throw new Error('ID nhiệm vụ không hợp lệ');
  }

  const validStatuses = ['PENDING', 'COMPLETED', 'OVERDUE'];
  if (!validStatuses.includes(status)) {
    throw new Error('Trạng thái không hợp lệ');
  }

  return await taskRepo.updateTaskStatus(taskId, status);
};

import * as taskRepo from '../repositories/task.repository';
import { Prisma } from '@prisma/client';

export const createComplianceTask = async (
  data: Prisma.ComplianceTaskCreateInput,
) => {
  if (new Date(data.deadline as string) < new Date()) {
    console.warn('Date deadline is in the past.');
  }

  return await taskRepo.createTask(data);
};

export const getDashboardTasks = async () => {
  return await taskRepo.findAllTasks();
};

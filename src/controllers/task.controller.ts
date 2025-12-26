import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const createComplianceTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.createComplianceTask(req.body);

    return res.status(201).json({
      success: true,
      message: 'Compliance task created successfully',
      data: result,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(400).json({ success: false, message });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const data = await taskService.getDashboardTasks();
    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    });
  }
};

export const getTasksByContract = async (req: Request, res: Response) => {
  try {
    const { contractId } = req.params;
    const data = await taskService.getTasksByContract(contractId);
    return res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ success: false, message });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await taskService.updateTaskStatus(id, status);

    return res.status(200).json({
      success: true,
      message: 'Update status successful',
      data: updatedTask,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Cannot update status',
    });
  }
};

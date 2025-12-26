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

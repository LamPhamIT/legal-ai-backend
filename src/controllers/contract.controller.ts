import { Request, Response } from 'express';
import * as contractService from '../services/contract.service';
import { z } from 'zod';
import { createContractSchema } from '../dtos/contract.schema';
import { ContractStatus } from '@prisma/client';

export const saveProcessedContract = async (req: Request, res: Response) => {
  try {
    const validatedData = createContractSchema.parse(req.body);

    const result = await contractService.processAndStore(validatedData);

    return res.status(201).json({
      success: true,
      message: 'Contract processed and saved successfully',
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.issues.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    const message =
      error instanceof Error ? error.message : 'Internal server error';
    const status = message === 'CONTRACT_ALREADY_EXISTS' ? 409 : 500;

    return res.status(status).json({
      success: false,
      message,
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await contractService.updateContractStatus(
      Number(id),
      status as ContractStatus,
    );

    return res.status(200).json({
      success: true,
      message: `Contract status updated to ${status}`,
      data: result,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ success: false, message });
  }
};

export const getContracts = async (req: Request, res: Response) => {
  try {
    const data = await contractService.getAllContracts();

    return res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({
      success: false,
      message,
    });
  }
};

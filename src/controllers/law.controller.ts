import { Request, Response } from 'express';
import { createLawSchema } from '../dtos/law.schema';
import * as lawService from '../services/law.service';
import { ZodError } from 'zod';

export const createLawHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = createLawSchema.parse(req.body);

    const law = await lawService.createLaw(validatedData);

    res.status(201).json({
      message: 'Law created successfully',
      data: law,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Invalid request data',
        errors: error.issues,
      });
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      (error as Error).message === 'LAW_ALREADY_EXISTS'
    ) {
      return res.status(409).json({
        message: 'Law already exists',
      });
    }

    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const getLatestLawsHandler = async (_: Request, res: Response) => {
  const laws = await lawService.getLatestLaws();
  res.json({
    data: laws,
  });
};

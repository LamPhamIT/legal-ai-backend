import { Router } from 'express';
import * as taskController from '../controllers/task.controller';

const router = Router();

router.post('/', taskController.createComplianceTask);

export default router;

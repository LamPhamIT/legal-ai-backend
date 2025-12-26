import { Router } from 'express';
import * as taskController from '../controllers/task.controller';

const router = Router();
router.patch('/:id/status', taskController.updateTaskStatus);

router.post('/', taskController.createComplianceTask);
router.get('/', taskController.getAllTasks);

export default router;

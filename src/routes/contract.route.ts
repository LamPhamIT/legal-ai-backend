import { Router } from 'express';
import * as contractController from '../controllers/contract.controller';

const router = Router();

router.post('/', contractController.saveProcessedContract);
router.patch('/:id/status', contractController.updateStatus);

export default router;

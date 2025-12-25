import { Router } from 'express';
import {
  createLawHandler,
  getLatestLawsHandler,
} from '../controllers/law.controller';

const router = Router();

router.post('/', createLawHandler);
router.get('/latest', getLatestLawsHandler);

export default router;

import { Router } from 'express';

import { submitRequest } from '../controllers/submit.controller';

const router = Router();

router.post('/', submitRequest);

export default router;

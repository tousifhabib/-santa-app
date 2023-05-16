import * as path from 'path';

import { Request, Response } from 'express';

import logger from '../middlewares/logger.middleware';

export function getIndex(req: Request, res: Response): void {
  logger.info('Main page accessed');
  res.sendFile(path.join(__dirname, '../../views/index.html'));
}

import * as path from 'path';

import { Request, Response } from 'express';

import logger from '../middlewares/logger.middleware';

/**
 * Sends the main page as a response
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export function getIndex(req: Request, res: Response): void {
  logger.info('Main page accessed');
  res.sendFile(path.join(__dirname, '../../views/index.html'));
}

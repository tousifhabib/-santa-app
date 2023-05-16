import { Request, Response } from 'express';

/**
 * Middleware for handling errors
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
function errorMiddleware(err: Error, req: Request, res: Response) {
  res.status(500).send('Something broke!');
}

export default errorMiddleware;
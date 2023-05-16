import { Request, Response } from 'express';

function errorMiddleware(err: Error, req: Request, res: Response) {
  res.status(500).send('Something broke!');
}

export default errorMiddleware;
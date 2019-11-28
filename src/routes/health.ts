import { Request, Response, NextFunction } from 'express';

export let get = (req: Request, res: Response) => {
  res.status(200).json({ healthy: true });
};

export default {
  get
};

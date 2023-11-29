import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  next();
};

export default requestLogger;

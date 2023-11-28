import { Response } from "express";

export const BadRequest = (res: Response, message: string) => {
  return res.status(400).json({ status: "error", error: message });
};

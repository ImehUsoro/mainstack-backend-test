import { RequestHandler } from "express";

export const notFound: RequestHandler = (req, res) => {
  const message = "Route does not exist";
  return res.status(404).json({ message });
};

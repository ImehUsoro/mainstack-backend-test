import { Request, Response } from "express";
import { matchedData } from "express-validator";
import {
  createUserService,
  deleteUserByIdService,
  findUserByIdAndRespondService,
  getAllUsersService,
  loginService,
  updateUserByIdService,
} from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
  const { body } = req;
  await createUserService(body, res);
};

export const login = async (req: Request, res: Response) => {
  const { body } = req;
  await loginService(body, res);
};

export const getAllUsers = async (_req: Request, res: Response) => {
  await getAllUsersService(res);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findUserByIdAndRespondService(id, res);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userData } = req.body;

  await updateUserByIdService(id, userData, res);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUserByIdService(id, res);
};

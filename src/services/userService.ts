import bcrypt from "bcrypt";
import { Response } from "express";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../dtos/users";
import User from "../models/User";
import { generateAccessToken } from "../utils/utils";

export const createUserService = async (body: CreateUserDto, res: Response) => {
  try {
    const { email, password, firstName, lastName } = body;
    const existingUser = await findUserByEmailService(email);

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        error: "User with this email already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });

    return res.status(201).json({
      status: "success",
      message: "Successfully created a new User",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const loginService = async (data: LoginUserDto, res: Response) => {
  try {
    const { email, password } = data;
    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "error", error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({
      email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return res.status(201).json({
      status: "success",
      message: "Login successful",
      user,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const findUserByEmailService = async (email: string) => {
  const user = User.findOne({ email });

  if (!user) {
    return null;
  }

  return user;
};

export const getAllUsersService = async (res: Response) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json({
      status: "success",
      message: "Users successfully retrieved",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const findUserByIdAndRespondService = async (
  id: string,
  res: Response
) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "User successfully retrieved",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const findUserByIdService = async (id: string) => {
  const user = await User.findById(id).select("-password");
  if (!user) {
    return null;
  }
  return user;
};

export const updateUserByIdService = async (
  userId: string,
  data: UpdateUserDto,
  res: Response
) => {
  try {
    const user = await findUserByIdService(userId);

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    await User.updateOne({ _id: userId }, { ...data });

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" });
  }
};

export const deleteUserByIdService = async (userId: string, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }

    return res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

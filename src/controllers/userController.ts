import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/User";
import { generateAccessToken } from "../utils/utils";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { password, email, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "This email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    await newUser.save();

    const userObject = newUser.toObject();

    return res.status(201).json({
      status: "success",
      message: "User successfully created",
      user: userObject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json({
      status: "success",
      message: "Users successfully retrieved",
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      status: "success",
      message: "User successfully retrieved",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body.userData;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    await user.save();

    return res
      .status(200)
      .json({ status: "success", message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

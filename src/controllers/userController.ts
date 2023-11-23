// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const accessToken = jwt.sign({ username }, "your-secret-key");
    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  // ... check user credentials ...

  const user = {
    /* user details */
  };
  const accessToken = jwt.sign(user, "your-secret-key");
  res.json({ accessToken });
};

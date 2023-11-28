import jwt from "jsonwebtoken";

export interface UserPayload {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
}
export const generateAccessToken = (payload: UserPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

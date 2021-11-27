import User from "@/models/user";
import connectDB from "@/utils/connect_db";
import auth, { AuthResponse } from "@/middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method
  } = req;
  
  const isAuthenticated: AuthResponse = await auth(req, res);

  if (!isAuthenticated.success) {
    return res.status(200).json({
      message: isAuthenticated.message
    });
  }
  
  await connectDB();

  switch (method) {
    case 'GET':
      const users = await User.find().select('username');
      return res.status(200).json({
        users
      });
      break;
    default:
      return res.status(403).json({
        error: `[${method}] method not allowed.`
      });
    }
  }
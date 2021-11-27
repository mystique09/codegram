import User from "@/models/user";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  success: boolean,
  message: string
}

export type AuthResponse = {success: boolean, message: string};

async function auth(req: NextApiRequest, res: NextApiResponse<Response>): Promise<Response> {
  const {
    session_id: authorization
  } = req.cookies;

  if (!authorization){
    return {success: false, message: "Authorization header is missing."};
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const {
      _id
    } = payload;

    const user = await User.findById(_id).select('username');
    if(!user) {
      return {success: false, message: "User not found"};
    }
    
    return {success: true, message: "Authenticated!"};
  } catch (e) {
    return {success: false, message: e.message};
  }
}

export default auth;
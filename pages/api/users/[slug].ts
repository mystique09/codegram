import User from "@/models/user";
import connectDB from "@/utils/connect_db";
import auth, { AuthResponse } from "@/middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { slug } = req.query;
  const isAuthenticated: AuthResponse = await auth(req, res);

  if (!isAuthenticated.success) {
    return res.status(200).json({
      message: isAuthenticated.message
    });
  }
  
  if(slug.length !== 24) {
    return res.status(402).json({ error: `${slug} is an invalid ID`});
  }
  
  await connectDB();
  
  switch (method) {
    case 'GET':
      const user = await User.findById(({ _id: slug })).select('username');
      
      if(!user) {
        return res.status(404).json({ error: `${slug} doesn't exist.` });
      }
      return res.status(200).json({ user });
      break;
    
    default:
      return res.status(403).json({ error: `[${method}] method not allowed.`});
  }
}
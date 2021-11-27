import connectDB from "@/utils/connect_db";
import User from "@/models/user";
import assignToken from "@/utils/assign_token";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    username,
    password
  } = req.body;
  
  const {
    method
  } = req;

  await connectDB();

  switch (method) {
    case "POST":

      if ([!username, !password].includes(true)) {
        return res.status(403).json({
          message: "Complete missing fields."
        });
      }

      const user = await User.findOne({
        username
      }).select('username password');

      if (!user) {
        return res.status(404).json({
          error: "User doesn't exist!"
        });
      }

      user.comparePassword(password, user.password, async function(error, isMatch) {
        if (error)throw error;

        if (!isMatch)return res.status(403).json({
          error: 'Username or password is incorrect.'
        });

        try {
          const token = await assignToken({
            _id: user._id,
            username: user.username
          }, '1d', ACCESS_TOKEN_SECRET);
          
          const cookieOption = {
            maxAge: 60*60*24*7,
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: (process.env.NODE_ENV === "production")
          };
          res.setHeader('Set-Cookie', serialize('session_id', token, cookieOption));

          return res.status(200).json({
            message: "Login Success!",
            user: {
              _id: user._id,
              username: user.username
            }
          });

        } catch (e) {
          return res.status(403).json({
            error: e.message
          });
        }
      });
      
      break;

    default:
      res.status(400).json({ message: `[${method}] method not allowed.` })
      break;
  }
}
import Post from "@/models/post";
import connectDB from "@/utils/connect_db";
import auth, { AuthResponse } from "@/middleware/auth";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    slug
  } = req.query;
  const {
    method
  } = req;
  const isAuthenticated: AuthResponse = await auth(req, res);

  if (!isAuthenticated.success) {
    return res.status(200).json({
      message: isAuthenticated.message
    });
  }

  if (slug.length !== 24) {
    return res.status(402).json({
      error: `${slug} is not a valid ID.`
    });
  }

  await connectDB();

  switch (method) {
    case "GET":
      const post = await Post.findById({
        _id: slug
      }).populate('author', 'username');
      res.status(200).json({
        post
      });
      break;

    default:
      res.status(403).json({
        error: `[${method}] method not allowed.`
      });
      break;
  }
}
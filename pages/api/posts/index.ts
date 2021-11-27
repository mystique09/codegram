import Post from "@/models/post";
import connectDB from "@/utils/connect_db";
import auth, { AuthResponse } from "@/middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    author,
    description,
    image
  } = req.body;
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
    case "GET":
      const posts = await Post.find();
      res.status(200).json({
        posts
      });

      break;
    case "POST":

      if ([!author, !description].includes(true)) {
        return res.status(403).json({
          message: "Complete missing fields."
        });
      }

      try {
        const newPost = new Post({
          author,
          description,
          image
        });

        const saved = await newPost.save();

        if (saved) {
          return res.status(200).json({
            success: true, message: `New post added by ${author}`
          });
        }
      } catch(e) {
        return res.status(402).json({
          success: false, error: e.message
        });
      }
      break;
    default:
      res.status(403).json({
        error: `[${method}] method not allowed.`
      });
      break;
  }

}

export default handler;
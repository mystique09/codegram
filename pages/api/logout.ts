import { serialize } from "cookie";

export default async function handler(req, res){
  const { method } = req;
  
  switch (method) {
    case 'POST':
      res.setHeader('Set-Cookie', serialize("session_id", null, {
        maxAge: 0,
        path: "/",
        httpOnly: true,
        sameSite: "strict"
      }));
      return res.status(200).json({ message: "Logged out" });
      break;
    
    default:
      return res.status(200).json({ message: "Not allowed" });
  }
}
import connectDB from "@/utils/connect_db";
import User from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, email, password } = req.body;
    const { method } = req;
    
    await connectDB();

    switch (method) {
        case "POST":
            if ([!username, !email, !password].includes(true)){
                return res.status(403).json({error: "Complete missing fields."});
            }
        
            try {
                const userExist = await User.findOne({ username });

                if (userExist){
                    throw new Error('User already exist!');
                }

                const newUser = new User({
                    username,
                    email,
                    password
                });

                const saved = await newUser.save();
                if(saved) {
                    return res.status(200).json({ message: "Account registered." });
                }
            } catch(e) {
                return res.status(500).json({ error: e.message });
            }
            break;
    
        default:
            res.status(400).json({ success: false, message: `[${method}] method not allowed.` })
            break;
    }
}
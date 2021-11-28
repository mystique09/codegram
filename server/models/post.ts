import mongoose, { Schema } from "mongoose";
import User from "@/models/user"

const PostSchema: Schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Author is required!"],
    ref: User
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    default: ""
  },
  image: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NGC_4414_%28NASA-med%29.jpg/310px-NGC_4414_%28NASA-med%29.jpg'
  },
  created_at: {
    type: Date,
    default: Date()
        }
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
import mongoose, { CallbackWithoutResult, MongooseOptions } from "mongoose";

const MONGO_URL: string = process.env.MONGO_URL;

if(!MONGO_URL) {
    console.log("MONGODB URL IS MISSING, DEFINE IT INSIDE .env.development.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    
    if(!cached.conn) {
        const DB_OPTIONS: any = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        cached.promise = await mongoose.connect(MONGO_URL, DB_OPTIONS);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
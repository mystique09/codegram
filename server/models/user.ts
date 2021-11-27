import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcryptjs";
import hashPassword from '@/utils/hash_password';

const UserSchema: Schema<{username: string, password: string, email: string}> = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Username is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator(v) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(v);
            },
            message: "{VALUE} is not a valid email!"
        },
        required: [true, "Email is required!"]
    },
});

UserSchema.methods.comparePassword = async function(candidatePass: string, hashedPass: string, cb: Function) {
    try {
      const isMatch = await bcrypt.compare(candidatePass,
        hashedPass);
        
      return cb(null, isMatch);
    } catch (e) {
      return cb(e, null);
    }
};

UserSchema.pre('save', function(next: Function) {
    const user = this;

    hashPassword(user.password, function(error: Error, hashedPassword: string) {
      if (error) throw error;

      user.password = hashedPassword;
      next();
    });
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
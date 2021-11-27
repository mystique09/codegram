import bcrypt from "bcryptjs";

async function hashPassword(password: string, cb: Function) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    return cb(null, hashedPassword);
  }catch(error) {
    return cb(error, null);
  }
}

export default hashPassword;
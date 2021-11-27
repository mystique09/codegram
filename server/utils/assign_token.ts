import jwt, {JwtPayload} from "jsonwebtoken";

async function assignToken(payload: JwtPayload, expIn: string | number, secret: string) {
  try {
    const accessToken = await jwt.sign(payload, secret, {
      expiresIn: expIn
    });
    return accessToken;
  } catch (e) {
    throw new Error(e.message);
  }
}

export default assignToken;
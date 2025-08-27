import * as jwt from "jsonwebtoken";
import { IJwtPayload } from "../../../@types";
const secret = process.env.JWT_SECRET;
export const generateToken = (payload: IJwtPayload, options?: jwt.SignOptions) => {
    return jwt.sign(payload, secret, {expiresIn: "1d"})
}

export const verifyToken = (token: string): IJwtPayload => {
    return jwt.verify(token, secret) as IJwtPayload
}
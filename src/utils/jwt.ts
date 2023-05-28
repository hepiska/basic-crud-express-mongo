import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../assets/test.private.key'))

export const signToken = (payload: any) => {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: process.env.JWT_EXPIRATION_TIME });
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, privateKey, { algorithms: ['RS256'] });
}
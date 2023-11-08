import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKeyPath = path.join(__dirname, '../assets/test.private.key')




export const signToken = (payload: any) => {
  try {
    const privateKey = fs.readFileSync(privateKeyPath)
    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: process.env.JWT_EXPIRATION_TIME });

  } catch (error) {

  }
}

export const verifyToken = (token: string) => {
  const privateKey = fs.readFileSync(privateKeyPath)
  return jwt.verify(token, privateKey, { algorithms: ['RS256'] });
}
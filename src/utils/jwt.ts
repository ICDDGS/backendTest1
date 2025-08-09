import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const KEY = process.env.JWT_KEY!;

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, KEY, {
        expiresIn: '1h',
    });
}
import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_SECRET || '';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, KEY, {
        expiresIn: '1h',
    });
}
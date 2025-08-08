import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const KEY = process.env.JWT_SECRET!;

export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) return res.json({ message: 'Token requerido'});

    try{
        const decode = jwt.verify(token, KEY);
        (req as any).user = decode;
        next();
    }catch (e){
    return res.json({ message: 'Token expirado'})
    }
} 

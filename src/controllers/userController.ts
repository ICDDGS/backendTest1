import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { error } from "console";
import { generateToken } from "../utils/jwt";

const JWT = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try{
        const existingEmail = await UserModel.findOne({email});
        
        if(existingEmail){
            return res.json({message: "El correo ya esta registrado"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new UserModel({email, password: hashedPassword});
        await newUser.save();

        res.json({message: 'Se registro correctamente'});
        
    }catch (e){
        res.json({message: 'Error al registrar usuario ', error:e});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = generateToken({ id: user._id, email: user.email });

            res.json({
                message: 'Inicio de sesión exitoso',
                token,
            });
        } else {
            res.json({ message: 'Datos incorrectos' });
        }
    } catch (e) {
        res.json({ message: 'Error al iniciar sesión', e });
    }
};

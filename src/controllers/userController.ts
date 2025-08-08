import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { error } from "console";

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

export const login  = async(req: Request, res: Response) => {
    const {email, password} = req.body;

    try{
        const existingUser = await UserModel.findOne({email});
        if (!existingUser) return res.json ({message: 'No se encuentra el usuario registrado con ese correo'});

        const pass = await bcrypt.compare(password, existingUser.password);
        if(!pass) return res.json({message: 'Contraseña incorrecta'});

        const token = jwt.sign({id:existingUser._id},JWT,{expiresIn: '1h'});

        res.json({token});
    }catch(e){
        res.json({message: 'Error al inciar sesion ', error: e});
    }
};
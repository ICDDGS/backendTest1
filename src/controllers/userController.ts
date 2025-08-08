import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
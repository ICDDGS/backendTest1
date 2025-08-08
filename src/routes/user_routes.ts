import { Router } from "express";
import {register, login} from '../controllers/userController';
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post('/register', register);
router.post('/login',login);
router.get('/perfil', verifyToken, (req, res)=>{
    res.json({ message: 'Prueba perfil'})
})

export default router;
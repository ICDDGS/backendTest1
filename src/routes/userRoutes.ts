import { Router } from "express";
import {createUser, readUser} from '../controllers/userController';
import { verifyToken } from "../middlewares/auth";

const router = Router();

router.post('/createUser', createUser);
router.post('/readUser',readUser);
router.get('/perfil', verifyToken, (req, res)=>{
    res.json({ message: 'Prueba perfil'})
})

export default router;
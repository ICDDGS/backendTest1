import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { createOrder, getAllOrders, getOrder,
    updateorder, deleteOrder, changeStatus
} from "../controllers/orderController";


const router = Router();

router.post('/createOrder',verifyToken,createOrder);
router.get('/getAllOrders',verifyToken,getAllOrders);
router.get('/getOrder/:id',verifyToken,getOrder);
router.put('/updateorder/:id',verifyToken,updateorder);
router.put('/changeStatus/:id/status',verifyToken,changeStatus);
router.delete('/deleteOrder/:id',verifyToken,deleteOrder);


export default router;
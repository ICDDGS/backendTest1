import {Router} from 'express';
import { createTruck, getAlltrucks, getTruckById,
    updateTruck, deletetruck} from '../controllers/truckController';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.post('/createTruck',verifyToken,createTruck);
router.get('/getAlltrucks',verifyToken,getAlltrucks);
router.get('/getTruckById/:id',verifyToken,getTruckById);
router.put('/updateTruck/:id',verifyToken,updateTruck);
router.delete('/deletetruck/:id',verifyToken,deletetruck);

export default router;
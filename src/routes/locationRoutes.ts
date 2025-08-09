import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import { createLocation, updateLocation,
    getAllLocations, getLocation, deleteLocation
} from "../controllers/locationController";

const router = Router();


router.post('/createLocation',verifyToken,createLocation);
router.get('/getAllLocations',verifyToken,getAllLocations);
router.get('/getLocation/:id',verifyToken,getLocation);
router.put('/updateLocation/:id',verifyToken,updateLocation);
router.delete('/deleteLocation/:id',verifyToken,deleteLocation);

export default router;
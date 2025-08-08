import { Request, Response } from "express";
import { TruckModel } from "../models/truck";

export const createTruck = async (req: Request, res: Response) =>{
    try {
        const {year,color,plates} = req.body;
        const user = (req as any).user.id;

        const truck = new TruckModel({ year, color, plates, user:user});
        await truck.save();
        res.json({message: 'Truck creado con exito', truck});
    }catch(e){
        res.json({ message: ' Error al agregar', e});
    }
};

export const getAlltrucks = async (req: Request, res: Response)  => {
    try{
        const user = (req as any).user.id;
        const trucks = await TruckModel.find({ user: user});
        res.json(trucks);
    }catch(e){
        res.json({ message: 'Error al obtener los camiones', e});
    }
};

export const getTruckById = async (req: Request, res: Response) => {
    try{
        const truck = await TruckModel.findById(req.params.id);
        if(!truck) return res.json({message: 'Camion no encontrado'});
        res.json(truck)
    }catch(e){
        res.json({message: 'Error al obtener el camion'});
    }
}

export const updateTruck = async (req: Request, res: Response) => {
    try {
        const truck = await TruckModel.findByIdAndUpdate(req.params.id,
        req.body,{
            new: true,
            runValidators: true,  
        }
        );

        if (!truck) return res.status(404).json({ message: 'Camión no encontrado' });
        return res.json({ message: 'Camión actualizado', truck });

    } catch (e) {
        return res.status(500).json({ message: 'Error al actualizar', error: e });
    }
};


export const deletetruck = async (req: Request, res: Response) => {
    try{
        const truck = await TruckModel.findByIdAndDelete(req.params.id);
        if(!truck) return res.json({message: 'Camion no encontrado'});
        res.json({message: 'Camion eliminado'})
    }catch (e){
        res.json({message: 'Error al borrar',e})
    }
}



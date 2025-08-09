import { Request, Response } from "express";
import { LocationModel } from "../models/location";

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY!;

export const createLocation = async (req: Request, res: Response) => {
    try {
        const { place_id } = req.body;

        if (!place_id) return res.json({ message: 'Se requiere place_id' });

        const exist = await LocationModel.findOne({ place_id });
        if (exist) return res.json({ message: 'La localizacion ya existe', location: exist });

        const url = `https://places.googleapis.com/v1/places/${place_id}?fields=id,displayName,formattedAddress,location&key=${GOOGLE_API_KEY}`;

        const resp = await fetch(url);
        const data = await resp.json();

        if (!resp.ok) return res.json({message: 'No se pudo acceder a place_id'});

        const user = (req as any).user.id;
        const address = data.formattedAddress;
        const lat = data.location.latitude;
        const lng = data.location.longitude;

        const loc = await LocationModel.create({
        user,
        address,
        place_id,
        latitude: lat,
        longitude: lng,
        });

        return res.json(loc);
    } catch (e) {
        return res.json({ message: 'Error al crear la localizacion', e });
    }
};


export const getAllLocations = async (req: Request, res: Response) => {
    try{
        const user = (req as any).user.id;
        const locations = await LocationModel.find({user: user});
        res.json(locations);        
    }catch(e){
        res.json({message: "Error al obtener localizaciones",e});
    }
};

export const getLocation = async (req: Request, res: Response) => {
    try{
        const location = await LocationModel.findById(req.params.id)
        if (!location) return res.json({message: "Localizacion no encontrada"});
        res.json(location)
    }catch(e){
        res.json({message: "Error al obtener localizacion",e});
    }
};

export const updateLocation = async (req: Request, res: Response) => {
    try{
        const location = await LocationModel.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, runValidators: true 
        });
        if (!location) return res.json({ message: 'localizacion no encontrada' });
        res.json({ message: 'localizacion actualizada', location: location });

    }catch(e){
        res.json({message: "Error al actualizar",e});
    }
};


export const deleteLocation = async (req: Request, res: Response) => {
    try {
        const location = await LocationModel.findByIdAndDelete(req.params.id);
        if (!location) return res.status(404).json({ message: 'localizacion no encontrada' });
        res.json({ message: 'localizacion eliminada' });
    } catch (e) {
        res.json({ message: 'Error al eliminar', e });
    }
    };



import { Request, Response } from "express";
import { OrderModel } from "../models/order";
import { TruckModel } from "../models/truck";
import { LocationModel } from "../models/location";

export const createOrder = async (req: Request, res: Response) => {
    try{
        const user = (req as any).user.id;
        const {truck, pickup, dropoff } = req.body;

        const existTruck = await TruckModel.findOne({_id: truck, user: user});
        if (!existTruck) return res.json({message: 'El camion no existe'});

        const [existPickup, existsDropoff] = await Promise.all([
        LocationModel.exists({ _id: pickup }),
        LocationModel.exists({ _id: dropoff }),
        ]);
        if (!existPickup || !existsDropoff) return res.json({ message: 'pickup o dropoff inválidos' });

        const order = await OrderModel.create({user, truck, pickup, dropoff, status: 'Pendiente'})
        res.json(order);

    }catch(e){
        res.json({message: 'Error al crear orden', e});
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try{
        const user = (req as any).user.id;
        const orders = await OrderModel.find({user})
        .populate('truck')
        .populate('pickup')
        .populate('dropoff');

        res.json({ count: orders.length, orders });
    }catch(e){
        res.json({message: 'Error al mostrar orednes',e});
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try{
        const user = (req as any).user.id;
        const order = await OrderModel.findOne({_id:req.params.id, user})
        .populate('truck pickup dropoff');

        if (!order) return res.json({message: 'Orden no encontrada'});
        res.json(order);
    }catch(e){
        res.json({message: 'Error al mostrar orden'})
    }
};

export const updateorder = async (req: Request, res: Response) => {
    try{
        const user = (req as any).user.id;
        const order = await OrderModel.findOneAndUpdate(
            {_id:req.params.id, user}, req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if(!order) return res.json({message: 'Orden no encontrada'});
        res.json(order);

    }catch(e){
        res.json({message: 'error al actualizar orden',e});
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try{
        const user = (req as any).user.id;
        const order = await OrderModel.findByIdAndDelete({_id:req.params.id, user});

        if(!order) return res.json({message: 'Orden no encontrada'});
        res.json({message: 'Orden eliminada'});
    }catch(e){
        res.json({message: 'Error al eliminar orden',e})
    }
};

export const changeStatus = async (req:Request, res:Response) => {
    try{
        const user = (req as any).user.id;
        const {status} = req.body as {status: 'Pendiente' | 'Procesando' | 'Enviando' | 'Entregado' |'Cancelado'};

        const options = ['Pendiente','Procesando','Enviando', 'Entregado', 'Cancelado']
        if(!options.includes(status)) return res.json({messge: 'Estado invalido'});
        
        const order = await OrderModel.findOneAndUpdate({_id:req.params.id, user},
            {status},
            {new: true}
        );
        if(!order) return res.json({messge: 'Orden no encontrada'});
        res.json({message: 'Estado actualizado'})
    }catch(e){
        res.json({message: 'Error al cambiar status',e});
    }
};
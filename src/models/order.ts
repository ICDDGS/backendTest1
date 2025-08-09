import { Schema, model, Document, Types } from "mongoose";

export type status = 'Pendiente' | 'Procesando' | 'Enviando' | 'Entregado' |'Cancelado';

export interface Order extends Document{
    user: Types.ObjectId;
    truck: Types.ObjectId;
    status: status;
    pickup: Types.ObjectId;
    dropoff: Types.ObjectId;
}

const OrderSchema = new Schema<Order>({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    truck: { 
        type: Schema.Types.ObjectId, 
        ref: 'Truck', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pendiente','Procesando','Enviando', 'Entregado', 'Cancelado'], 
        default: 'Pendiente' 
    },
    pickup: { 
        type: Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true 
    },
    dropoff: { 
        type: Schema.Types.ObjectId, 
        ref: 'Location',
        required: true 
    },
});

export const OrderModel = model<Order>('Order',OrderSchema);
import mongoose, { Schema, model, Document } from "mongoose";

export interface Truck extends Document{
    user: mongoose.Types.ObjectId;
    year: string;
    color: string;
    plates: string;
}

const TruckSchema = new Schema<Truck>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    plates: {
        type: String,
        required: true,
        unique: true,
    },
});

export const TruckModel = model<Truck>('Truck',TruckSchema);
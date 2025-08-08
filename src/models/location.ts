import {Schema, model, Document, Types} from 'mongoose';

export interface Location extends Document{
    user: Types.ObjectId;
    address: string;
    pace_id: string;
    latitude: number;
    longitude: number;
}

const LocationSchema = new Schema<Location>({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pace_id: {
        type:String,
        required:true,
        unique: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
});

export const LocationModel = model<Location>('Location',LocationSchema);
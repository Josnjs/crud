import { Schema } from "mongoose";
import mongoose from 'mongoose';

export interface IUser {
    name: string;
    document: string;
    age: number;
    email: string;
    password: string;
    createdAt: string | Date;
};

export const userSchema = new Schema<IUser>({
    name: {
        type: String
    },
    document: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export const User = mongoose.model<IUser>('User', userSchema);
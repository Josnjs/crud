import UserRepository from "../repositories/user-repository";
import { IUser } from "../models/user-model";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const secretJwt = process.env.JWT_SECRET_KEY || "";

class UserService {

    getAll() {
        return UserRepository.getAll();
    };

    getByDocument(document: string) {
        return UserRepository.getByDocument(document);
    };

    async createUser(user: IUser) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        };
        return UserRepository.create(user);
    };

    async authorization(document: string, password: string) {
        const user = await UserRepository.getByDocument(document);
        if (!user) return new Error('User does not exist');

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            return Jwt.sign({ document: user.document, _id: user._id }, secretJwt, {
                expiresIn: '10m'
            });
        };

        throw new Error('User not found...');
    }

    removeUser(document: string) {
        return UserRepository.remove(document);
    };

    updateUser(document: string, user: IUser) {
        return UserRepository.update(document, user);
    };
};

export default new UserService();
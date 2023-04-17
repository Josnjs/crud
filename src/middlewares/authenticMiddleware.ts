import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

dotenv.config();
const secretJwt = process.env.JWT_SECRET_KEY || "";

export function authentic(req: Request, res: Response, next: NextFunction) {
    const tokken = req.headers['authorization'];
    if (!tokken) {
        return res.status(401).send({ message: "Access danied" })
    }
    const tokkenSplited = tokken?.split('Bearer ');
    const decoded = Jwt.verify(tokkenSplited[1], secretJwt);

    if (!decoded) return res.status(401).send({ message: "Access danied" });

    next();
};


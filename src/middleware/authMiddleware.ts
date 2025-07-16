import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../utils/response";
import jwt from "jsonwebtoken";

type userPyload = {
    id: string,
    email: string,
}

interface jwtPayload extends jwt.JwtPayload {
    id: string,
    email: string
}

export interface AuthRequest extends Request {
    user?: userPyload
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) ResponseService({
            res, 
            message: "Unauthorized access",
            status: 401
        })
        const token = authorization?.split(" ")[1] as string; 
        const isValid = jwt.verify(token, process.env.JWT_SECRET as string);
        
        const user: userPyload = {
            id:(isValid as jwtPayload).id,
            email: (isValid as jwtPayload).email
        }
        req.user = user;
        next();
            
    } catch (error) {
        const { message, stack } = error as Error;
        ResponseService({
            res,
            data: stack,
            message,
            status:500
        })

    }
}
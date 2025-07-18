import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../utils/response";
import jwt from "jsonwebtoken";

type userPyload = {
    _id: string,
    email: string,
}

interface jwtPayload extends jwt.JwtPayload {
    _id: string,
    email: string
}

export interface AuthRequest extends Request {
    user?: userPyload
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization);
        if (!authorization) ResponseService({
            res, 
            message: "Unauthorized access",
            status: 401
        })
        const token = authorization?.split(' ')[1] as string; 
        const isValid = jwt.verify(token as string, process.env.JWT_SECRET as string);
        
        const user: userPyload = {
            _id:(isValid as jwtPayload)._id,
            email: (isValid as jwtPayload).email
        }
        req.user = user;
        next();
            
    } catch (error) {
        const { stack } = error as Error;
        ResponseService({
            res,
            data: stack,
            message: 'please login',
            status:401
        })
    }
}
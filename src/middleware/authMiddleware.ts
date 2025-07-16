import { Request, Response, NextFunction } from "express";
import { ResponseService } from "../utils/response";
import jwt from "jsonwebtoken";

type userPyload = {
    id: string,
    email: string,
}

export interface AuthRequest extends Request {
    user?: userPyload
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) ResponseService({
            res, 
            message: "Unauthorized access",
            status: 401
        })
        const token = authorization?.split(" ")[1] as string; 
        const isValid = jwt.verify(token, process.env.JWT_SECRET as string);
        
        // const user = isValid as userPayload;
        // if (!user) {
            
        // }
            
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
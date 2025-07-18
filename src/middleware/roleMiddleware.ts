import { Request, Response, NextFunction } from 'express';

type userPyload = {
    id: string,
    email: string,
    role?: 'admin' | 'normal user'
}

export interface AuthRequest extends Request {
    user?: userPyload
}
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user ||req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin only.' });
    }
    next();
};
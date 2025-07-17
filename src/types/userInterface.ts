import { Response, Request } from "express";

export interface UserInterface {
    name: string,
    email: string,
    gender: 'male' | 'female' | 'other',
    password: string,
    role: 'admin' | 'normal user'
}

export interface CreateUserRequest extends Request{
    body: UserInterface
}
export interface UserControllerImplementation {
    createUser(req: CreateUserRequest, res: Response):void
    getAllUsers(req: Request, res: Response): void
    loginUser(req: Request, res: Response):void
}


import { Response, Request } from "express";

export interface UserInterface {
    name: string,
    email: string,
    gender: 'male' | 'female' | 'other'
    password:string
}
export interface CreateUserRequest extends Request{
    body: UserInterface
}
export interface UserControllerImplementation {
    createUser(req: CreateUserRequest, res: Response):void
    getUserByToken(req: Request, res: Response): void
    loginUser(req: Request, res: Response):void
}

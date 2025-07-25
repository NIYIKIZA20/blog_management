import { UserModel } from "../models/userModel";
import { Response,Request } from "express";
import { hashPassword } from '../utils/helper'
import { CreateUserRequest, UserControllerImplementation, UserInterface } from "../types/userInterface";
import { ResponseService } from "../utils/response";
import { generateToken } from "../utils/helper";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../middleware/authMiddleware";
import { ObjectId } from "mongoose";

export class UserController implements UserControllerImplementation {

    

    public async createUser(req: CreateUserRequest, res: Response) {
    try {
        const { email, password, gender, name } = req.body
    
        const userExist = await UserModel.exists({
        email
        })
        if (userExist) {
            ResponseService({
                data: null,
                res,
                status: 400,
                message:"User Already Exists"
            })
        }
        const user = new UserModel({
            email,
            password:await hashPassword(password),
            name,
            role: 'normal user',
            gender,
            isActive: true,
            createdAt:new Date()
        })
        await user.save()
        ResponseService({
            data: user,
            res,
            status: 201,
            message: "UserCreated Succffy"
        })
    } catch (error) {
        const { message, stack } = error as Error
         ResponseService({
                    res,
                    data:stack,
                    message,
                    status: 500,
                    success:false
                })
    }
    }
    public async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserModel.findById(id);
            if (!user) {
                return ResponseService({
                    res,
                    data: null,
                    status: 404,
                    message: "User not found"
                });
            }
            ResponseService({
                data: user,
                res,
                status: 200,
                message: "User retrieved successfully"
            });
        } catch (error) {
            const { message, stack } = error as Error;
            ResponseService({
                res,
                data: stack,
                message,
                status: 500,
                success: false
            });
        }
    }
    
    public async getAllUsers(req: AuthRequest, res: Response){
        try {

            const userId = (req?.user?._id) as string;
        
            const user = await UserModel.findOne({ _id: userId as unknown as ObjectId })
            ResponseService({
                res, 
                data: user,
                status: 200,
                message: 'user successfully loged'
            })
        
    } catch (error) {
        const { message, stack } = error as Error
        ResponseService({
            res,
            data: stack,
            message,
            status: 500,
            success: false
        })
    }
    }

    public async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email.toLowerCase() });
            //or const useExist = await UserModal.exists({ email: email.tolowerCase()})
            if (!user) {
                return ResponseService({
                    res,
                    data: null,
                    status: 400,
                    message: "Invalid email or password"
                });
            }
            const isMatch = bcrypt.compareSync(password, user.password as string);
            if (!isMatch) {
                return ResponseService({
                    res,
                    data: null,
                    status: 401,
                    message: "Invalid email or password"
                });
            }
            const token = generateToken({ id: user._id, email: user.email });
            ResponseService({
                res,
                data: { token, user },
                status: 200,
                message: "Login successful"
            });
        } catch (error) {
            const { message, stack } = error as Error;
            ResponseService({
                res,
                data: stack,
                message,
                status: 500,
                success: false
            });
        }
    }

}
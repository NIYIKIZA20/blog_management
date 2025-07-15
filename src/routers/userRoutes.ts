import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { UserCreationValidation } from "../schemas/userSchemaValidation";
import { UserController } from "../controllers/userController";

const userRouter = Router();
const controller = new UserController; 
userRouter.post(
    '/users/login',
    ValidationMiddleware({
        type: 'body',
        schema: UserCreationValidation 
    }),
    controller.loginUser.bind(controller)
);
userRouter.get('/users', controller.getAllUsers)

export {userRouter}
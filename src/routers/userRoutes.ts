import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { UserCreationValidation, UserLoginValidation } from "../schemas/userSchemaValidation";
import { UserController } from "../controllers/userController";


const userRouter = Router();
const controller = new UserController; 
userRouter.post('/users', ValidationMiddleware({
    type: 'body',
    schema: UserCreationValidation

})
    , controller.createUser.bind(controller));

userRouter.get('/users/:id', ValidationMiddleware({
    type: 'params',
    schema: UserCreationValidation
}),
    controller.getUserById.bind(controller));

userRouter.post(
    '/users/login',
    ValidationMiddleware({
        type: 'body',
        schema: UserLoginValidation 
    }),
    controller.loginUser.bind(controller)
);
userRouter.get('/users', controller.getAllUsers)

export {userRouter}
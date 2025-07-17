import { Router } from "express";
import { blogRouter } from "./blogRoutes";
import { userRouter } from "./userRoutes";
import { CommentRouter } from "./commentRoutes";


const routers = Router()
const allRotures = [blogRouter,userRouter, CommentRouter]
routers.use('/api/v1',...allRotures)
export {routers}
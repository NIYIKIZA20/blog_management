import { Router } from "express";
import { likeBlog } from '../controllers/likesController';
import { authMiddleware } from "../middleware/authMiddleware";
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { AddLikeSchema } from "../schemas/likeSchema";

const blogRouter = Router();
blogRouter.post('/blogs/:blogId/like',authMiddleware,
    ValidationMiddleware({ type: "body", schema: AddLikeSchema }), likeBlog);
export { blogRouter }
import { Router } from "express";
import { postComment } from '../controllers/commentController';
import { authMiddleware } from '../middleware/authMiddleware';
import { AddCommentSchema } from "../schemas/commentSchema";

const CommentRouter = Router();

CommentRouter.post('/blogs/:blogId/comments', authMiddleware,
    postComment);

export { CommentRouter };



import { Router } from "express";
import { postComment } from '../controllers/commentController';
import { authMiddleware } from '../middleware/authMiddleware';

const CommentRouter = Router();

CommentRouter.post('/blogs/:blogId/comments', authMiddleware, postComment);

export { CommentRouter };
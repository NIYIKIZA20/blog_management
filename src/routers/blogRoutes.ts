import { Router } from "express";
import { getAllBlogs, createBlog, getABlog } from '../controllers/blogController'
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { AddBlogSchema, IdValidationSchema } from '../schemas/blogSchema'
import { Schema } from "mongoose";
import { requireAdmin } from '../middleware/roleMiddleware';
import { postComment } from '../controllers/commentController';
import { authMiddleware } from '../middleware/authMiddleware';
import { getBlogWithDetails } from '../controllers/blogController';

const blogRouter = Router();
blogRouter.get('/blogs', getAllBlogs)
blogRouter.post('/blogs',authMiddleware,
    requireAdmin, ValidationMiddleware({ type: 'body', schema: AddBlogSchema }), createBlog)
blogRouter.get('/blogs/:id', ValidationMiddleware({
    type: 'params', schema: IdValidationSchema,
}), getABlog
)
// , blogRouter.get('/blogs/comments', getAllComments({
//         type: 'body',
//         Schema: AddCommentSchema
// }), createComments)
blogRouter.post('/', requireAdmin, createBlog);

blogRouter.get('/blogs/:blogId/details', getBlogWithDetails);
export { blogRouter }
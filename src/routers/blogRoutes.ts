import { Router } from "express";
import { getAllBlogs, createBlog, getABlog } from '../controllers/blogController'
import { ValidationMiddleware } from "../middleware/validationMiddleware";
import { AddBlogSchema, IdValidationSchema } from '../schemas/blogSchema'
import { Schema } from "mongoose";
const blogRouter = Router();
blogRouter.get('/blogs', getAllBlogs)
blogRouter.post('/blogs', ValidationMiddleware({ type: 'body', schema: AddBlogSchema }), createBlog)
blogRouter.get('/blogs/:id', ValidationMiddleware({
    type: 'params', schema: IdValidationSchema,
}), getABlog
)
// , blogRouter.get('/blogs/comments', getAllComments({
//         type: 'body',
//         Schema: AddCommentSchema
// }), createComments)
export { blogRouter }
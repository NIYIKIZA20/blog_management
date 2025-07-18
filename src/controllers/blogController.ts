import { ResponseService } from "../utils/response";
import { BlogInterface, GetAllBlogs, interfaceAddBlog } from '../types/blogInterface'
import { blogModel } from "../models/blogModal";
import { Request, Response } from 'express'
import { generateSlug } from "../utils/helper";
import { ObjectId } from "mongodb";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middleware/authMiddleware";


const getAllBlogs = async(req: Request, res: Response) => {
    try {
        const blogs =await  blogModel.find().populate('author');
        console.log(blogs)
        
        ResponseService({
            data: blogs,
            status: 200,
            success: true,
            res
        })
    } catch (err) {
        const { message, stack } = err as Error
        res.status(500).json({ message, stack })
    }
}

interface IRequestBlog extends AuthRequest {
    body: interfaceAddBlog
}
const createBlog = async(req: IRequestBlog, res: Response) => {
    try {
       const _id = req?.user?.id as string
        const author = await UserModel.findOne({
            _id
        })
        const { title, description, content, isPublished } = req.body
        const blog = new blogModel({
            title,
            description,
            content,
            slug: generateSlug(title),
            author,
            isPublished,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        await blog.save();
        ResponseService({
            data: blog,
            success: true,
            message: "Saved well",
            status: 201,
            res
        })
    

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
interface GetBlogByIdRequestInterface extends Request{
    params: {
        id:string
    }
}
const getABlog = async (req: GetBlogByIdRequestInterface, res: Response) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findOne({
            _id: new ObjectId(id),
        })
        if (!blog) {
            ResponseService({
                status: 404,
                success: false,
                message: "Blog not Found",
                res
            })
        }
        ResponseService({
            data: blog,
            res,
            message:"Blog Fetch successfuly"
        })
    } catch (error) {
        const { message,stack } = (error as Error)
        ResponseService({
            res,
            data:stack,
            message,
            status: 500,
            success:false
        })
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    const { blogId } = req.params;
    const updates = req.body;
    const blog = await blogModel.findByIdAndUpdate(blogId, updates, { new: true });
    res.json(blog);
};

export const deleteBlog = async (req: Request, res: Response) => {
    const { blogId } = req.params;
    await blogModel.findByIdAndDelete(blogId);
    res.json({ message: 'Blog deleted.' });
};




export const getBlogWithDetails = async (req: Request, res: Response) => {
    const { blogId } = req.params;
    const blog = await blogModel.findById(blogId)
        .populate('comments') // Populates comments array
        .populate({
            path: 'comments',
            populate: { path: 'user', select: 'name email role' } // Populates user in each comment
        })
        .exec();

    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }

    // Optionally, get likes count or populate likes
    // If you use a Like model:
    // const likes = await LikeModel.countDocuments({ blog: blogId });

    res.json(blog);
};
    export { getAllBlogs,createBlog,getABlog }
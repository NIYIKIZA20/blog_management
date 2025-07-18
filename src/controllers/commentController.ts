import { Request, Response } from 'express';
import { CommentModel } from '../models/commentModal';
import { UserModel } from '../models/userModel';
import { AuthRequest } from '../middleware/authMiddleware';



export const postComment = async (req:AuthRequest , res: Response) => {
    const { blogId } = req.params;
    const { content } = req.body;
    const userId = req.user?._id; 

    const user = await UserModel.findById(userId);
    if (!user || user.role !== 'normal user') {
        return res.status(403).json({ message: 'Only normal users can comment.' });
    }

    const comment = await CommentModel.create({ blog: blogId, user: userId, content });
    res.status(201).json(comment);
};
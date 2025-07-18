import { Request, Response } from 'express';
import { LikesModel } from '../models/likesModel';

export const likeBlog = async (req: Request, res: Response) => {
    const { blogId } = req.params;
    let likes = await LikesModel.findOne({ blog: blogId });
    if (!likes) {
        likes = await LikesModel.create({ blog: blogId, count: 1 });
    } else {
        likes.count += 1;
        await likes.save();
    }
    res.status(200).json(likes);
};
import mongoose from 'mongoose';

const LikesSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});

export const LikesModel = mongoose.model('Likes', LikesSchema);

// import mongoose, { model, Schema } from "mongoose"
// import { BlogInterface } from "../types/blogInterface"
// import { UserInterface } from "../types/userInterface"

// interface likesSchemaInterface {
//     author: UserInterface,
//     blog: BlogInterface,
//     isLiked: boolean,
//     createdAt: NativeDate
//     updatedAt: NativeDate
//     deletedAt: null | string | undefined
// }

// const likesModalSchema = new Schema<likesSchemaInterface>({
//      author: {
//             type: mongoose.Types.ObjectId,
//             ref: 'User'
//     },
//     blog: {
//         type: mongoose.Types.ObjectId,
//         ref: 'Blog'
//     },
//    isLiked: true,
//    createdAt: Date,
//     updatedAt: {
//         type: Date,
//         default: new Date(),
//         unique:true
//     },
//     deletedAt: Date
// })

// export const CommentModal =  model<likesSchemaInterface>("blogs", likesModalSchema)
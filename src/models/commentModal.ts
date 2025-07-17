import mongoose, { model, Schema } from "mongoose"
import { BlogInterface } from "../types/blogInterface"
import { UserInterface } from "../types/userInterface"

interface commentschemaInterface {
    author: UserInterface,
    blog: BlogInterface,
    message: String,
    createdAt: NativeDate
    updatedAt: NativeDate
    deletedAt: null | string | undefined
}

const commentModalSchema = new Schema<commentschemaInterface>({
    author: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    },
    message: String,
    createdAt: Date,
    updatedAt: {
        type: Date,
        default: new Date(),
        unique:true
    },
    deletedAt: Date
})

export const CommentModal =  model<commentschemaInterface>("blogs", commentModalSchema)
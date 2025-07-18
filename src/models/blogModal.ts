import mongoose, {model,Schema} from "mongoose"
import { BlogInterface } from "../types/blogInterface"
import { UserInterface } from "../types/userInterface"

interface BlogSchemaInterface{
    slug: string
    title: string
    author: UserInterface
    content: string
    isPublished: boolean
    description: string
    createdAt: NativeDate
    updatedAt: NativeDate
    deletedAt: null | string | undefined
}
const blogModelSchema = new Schema<BlogSchemaInterface> ({
    title: String,
    slug: String,
    description: String,
    content: String,
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    //comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    isPublished: Boolean,
    createdAt: Date,
    updatedAt: {
        type: Date,
        default: new Date(),
        unique:true
    },
    deletedAt:Date
})
export const blogModel =  model<BlogSchemaInterface>("blogs", blogModelSchema)
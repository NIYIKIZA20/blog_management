import joi from 'joi';

export const AddCommentSchema = joi.object({
    blog: joi.string().length(24).required(), 
    user: joi.string().length(24).required(), 
    content: joi.string().min(1).required()
});
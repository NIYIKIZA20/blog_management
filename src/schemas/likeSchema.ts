import joi from 'joi';

export const AddLikeSchema = joi.object({
    blog: joi.string().length(24).required(), 
    user: joi.string().length(24).required()  
});
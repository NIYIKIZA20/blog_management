//import { email, lowercase, minLength } from "joi"


import Joi from "joi";

export const UserLoginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// const mongoose = require('mongoose');
// const { isEmail } = require('validator');

// const userAuthSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: [true, 'Email required '],
//         unique: true,
//         lowercase: true,
//         validate: [isEmail, 'please provide']
//     },
//     password: {
//         type: String,
//         required: [true, "pasword required"]
//     }
// });
// userAuthSchema.post('save', async function (doc:any, next: any) {
//     console.log("new login crated", doc)
//     next(); 
// })

// userAuthSchema.pre('save', async function (doc: any, next: any) {
    
//     console.log('before saving user', doc);
//     next();
// });

// const UserAuth = mongoose.model('UserAuth', userAuthSchema);
// module.exports = UserAuth; 
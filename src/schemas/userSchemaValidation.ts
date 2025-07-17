import joi from 'joi'
export enum GenderEnum {
    male = "male",
    female = "female",
    other = "other"
}
export enum RoleEnum {
    user= "user",
    admin= 'admin' 

}
export const UserCreationValidation = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6),
    gender: joi.string().valid(...Object.values(GenderEnum)),
    role: joi.string().valid(...Object.values(RoleEnum))
});

export const UserLoginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});
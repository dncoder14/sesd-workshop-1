import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin'),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const validate = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

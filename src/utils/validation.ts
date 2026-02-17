import Joi, { Schema } from 'joi';

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

export const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    imageUrl: Joi.string().required(),
    category: Joi.string().required(),
});

export const orderSchema = Joi.object({
    orderItems: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            quantity: Joi.number().required(),
            imageUrl: Joi.string().required(),
            price: Joi.number().required(),
            product: Joi.string().required(),
        })
    ).required(),
    shippingAddress: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
    paymentMethod: Joi.string().required(),
    taxPrice: Joi.number().required(),
    shippingPrice: Joi.number().required(),
    totalPrice: Joi.number().required(),
});

export const validate = (schema: Schema, data: any): void => {
    const { error } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

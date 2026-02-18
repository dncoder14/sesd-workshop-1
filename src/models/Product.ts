import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    countInStock: number;
    imageUrl: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a product name'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price'],
            default: 0,
        },
        countInStock: {
            type: Number,
            required: [true, 'Count in stock is required'],
            default: 0,
        },
        imageUrl: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
        },
    },
    { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);

import { ProductRepository } from '../repositories/ProductRepository';
import { AppError } from '../utils/AppError';
import { validate, productSchema } from '../utils/validation';
import { IProduct } from '../models/Product';
import mongoose from 'mongoose';

export class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(queryParams: any) {
        const {
            keyword,
            pageNumber,
            limit,
            sortBy,
            ordering,
            minPrice,
            maxPrice,
            category
        } = queryParams;

        // Build Logic
        let filter: any = {};

        // Search
        if (keyword) {
            filter.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Filter by Category
        if (category) {
            filter.category = category;
        }

        // Filter by Price
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Sort
        let sort: any = {};
        if (sortBy) {
            sort[sortBy] = ordering === 'desc' ? -1 : 1;
        } else {
            sort = { createdAt: -1 };
        }

        // Pagination
        const page = Number(pageNumber) || 1;
        const pageSize = Number(limit) || 10;
        const skip = pageSize * (page - 1);

        const products = await this.productRepository.findAll(filter, sort, skip, pageSize);
        const count = await this.productRepository.count(filter);

        return {
            products,
            page,
            pages: Math.ceil(count / pageSize),
            total: count
        };
    }

    async getProductById(id: string): Promise<IProduct> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        return product;
    }

    async createProduct(data: any): Promise<IProduct> {
        validate(productSchema, data);
        return await this.productRepository.create(data);
    }

    async updateProduct(id: string, data: any): Promise<IProduct | null> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        return await this.productRepository.updateById(id, data);
    }

    async deleteProduct(id: string): Promise<IProduct | null> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new AppError('Product not found', 404);
        }
        return await this.productRepository.deleteById(id);
    }
}

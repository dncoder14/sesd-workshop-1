import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { asyncHandler } from '../utils/asyncHandler';

const productService = new ProductService();

export class ProductController {
    getProducts = asyncHandler(async (req: Request, res: Response) => {
        const data = await productService.getAllProducts(req.query);
        res.status(200).json(data);
    });

    getProductById = asyncHandler(async (req: Request, res: Response) => {
        const product = await productService.getProductById(req.params.id as string);
        res.status(200).json(product);
    });

    createProduct = asyncHandler(async (req: Request, res: Response) => {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    });

    updateProduct = asyncHandler(async (req: Request, res: Response) => {
        const product = await productService.updateProduct(req.params.id as string, req.body);
        res.status(200).json(product);
    });

    deleteProduct = asyncHandler(async (req: Request, res: Response) => {
        await productService.deleteProduct(req.params.id as string);
        res.status(200).json({ message: 'Product removed' });
    });
}

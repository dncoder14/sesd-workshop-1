import { ProductService } from '../services/ProductService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const productService = new ProductService();

export class ProductController {
    getProducts = asyncHandler(async (req, res) => {
        const data = await productService.getAllProducts(req.query);
        res.status(200).json(data);
    });

    getProductById = asyncHandler(async (req, res) => {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    });

    createProduct = asyncHandler(async (req, res) => {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    });

    updateProduct = asyncHandler(async (req, res) => {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(product);
    });

    deleteProduct = asyncHandler(async (req, res) => {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Product removed' });
    });
}

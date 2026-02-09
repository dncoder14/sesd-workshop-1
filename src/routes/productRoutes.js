import express from 'express';
import { ProductController } from '../controllers/ProductController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', protect, admin, productController.createProduct);
router.put('/:id', protect, admin, productController.updateProduct);
router.delete('/:id', protect, admin, productController.deleteProduct);

export default router;

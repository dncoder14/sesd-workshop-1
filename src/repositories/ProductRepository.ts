import { BaseRepository } from './BaseRepository';
import { Product, IProduct } from '../models/Product';

export class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(Product);
    }
}

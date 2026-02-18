import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findAll(
        filter: FilterQuery<T> = {},
        sort: Record<string, any> = {},
        skip: number = 0,
        limit: number = 10
    ): Promise<T[]> {
        return await this.model.find(filter).sort(sort).skip(skip).limit(limit);
    }

    async count(filter: FilterQuery<T> = {}): Promise<number> {
        return await this.model.countDocuments(filter);
    }

    async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(filter);
    }
}

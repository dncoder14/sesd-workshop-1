export class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async findAll(filter = {}, sort = {}, skip = 0, limit = 10) {
        return await this.model.find(filter).sort(sort).skip(skip).limit(limit);
    }

    async count(filter = {}) {
        return await this.model.countDocuments(filter);
    }

    async updateById(id, data) {
        return await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async findOne(filter) {
        return await this.model.findOne(filter);
    }
}

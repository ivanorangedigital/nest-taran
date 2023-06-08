import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/schemas/category.schema";

@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async getCategories(parent: string | null = null): Promise<Category[]> {
        return this.categoryModel
            .find({ parent })
            .sort({ position: 1 })
            .populate('image parent')
            .exec()
    }

    async getCategoryById(id: string): Promise<Category> {
        return this.categoryModel
            .findById(id)
            .exec()
    }

    async createCategory(data: Category): Promise<Category> {
        // lastCategory null default
        let position = null;

        // if data are sub categories get last subcategory created and add position + 1 to create subcategory
        if (data.parent) {
            position = await this.categoryModel
                .findOne({ parent: data.parent })
                .sort({ createdAt: -1 })
                .exec()
                .then(category => category.position + 1)
                .catch(() => 1)            
        };

        return new this.categoryModel({ ...data, position })
            .save();
    }

    async updateCategoryById(id: string, data: Category): Promise<Category> {
        return this.categoryModel
            .findByIdAndUpdate(id, {
                $set: data
            }, {
                setDefaultsOnInsert: true,
                new: true
            })
            .exec();
    }

    async deleteCategoryById(id: string): Promise<Category> {
        return this.categoryModel
            .findByIdAndDelete(id)
            .exec();
    }
}
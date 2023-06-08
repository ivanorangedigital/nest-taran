import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/schemas/Product.schema";

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async getProducts(category: string): Promise<Product[]> {
        return this.productModel
            .find({ category })
            .sort({ name: 1 })
            .exec()
    }

    async getProductById(id: string): Promise<Product> {
        return this.productModel
            .findById(id)
            .exec()
    }

    async createProduct(data: Product): Promise<Product> {
        return new this.productModel({ ...data }).save();
    }

    async deleteProductById(id: string): Promise<Product> {
        return this.productModel
            .findByIdAndDelete(id)
            .exec();
    }
}
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Image } from "src/schemas/image.schema";
import { Response } from 'express';

@Injectable()
export class ImageService {
    constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) { }

    async getImages(perPage = 12, page = 1, res: Response): Promise<Response<Image[]>> {
        // pagina 1 visualizzazione di 12 documenti a partire da 0 => 1 - 1 * 12
        // pagina 2 => 2 - 1 * 12
        const skip = (page - 1) * perPage;

        return Promise.all([
            this.imageModel.find().sort({ createdAt: -1 }).skip(skip).limit(perPage).exec(),
            this.imageModel.countDocuments()
        ]).then((result: [Image[], number]) => {
            const images = result[0];
            const total = result[1];
            const totalPages = Math.ceil(total / perPage);
            return res.set({ 'total': total, 'total_pages': totalPages }).send(images);
        });
    }

    async createImage(image: Image): Promise<Image> {
        return new this.imageModel(image).save();
    }

    async deleteImageById(id: string): Promise<Image> {
        return this.imageModel.findByIdAndDelete(id).exec();
    }
}